import base64
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import aiplatform
from google.cloud.aiplatform.gapic.schema import predict as aiplatform_predict
import google.generativeai as genai

# ========== Configuration ==========
# Vertex AI
PROJECT_ID = "969240603924"
ENDPOINT_ID = "4249538774075179008"
LOCATION = "us-central1"
API_ENDPOINT = "us-central1-aiplatform.googleapis.com"

# Gemini
GOOGLE_API_KEY = "AIzaSyADB9YP2Y15BI09sdKDFTNrXvXEcqWsQGc"
genai.configure(api_key=GOOGLE_API_KEY)
gemini_model = genai.GenerativeModel("gemini-1.5-flash")

# Flask setup
app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)

# ========== Vertex AI Prediction Function ==========
def predict_image_object_detection(file_content: bytes):
    client = aiplatform.gapic.PredictionServiceClient(
        client_options={"api_endpoint": API_ENDPOINT}
    )

    encoded_content = base64.b64encode(file_content).decode("utf-8")
    instance = aiplatform_predict.instance.ImageObjectDetectionPredictionInstance(
        content=encoded_content,
    ).to_value()
    instances = [instance]

    parameters = aiplatform_predict.params.ImageObjectDetectionPredictionParams(
        confidence_threshold=0.1,
        max_predictions=10,
    ).to_value()

    endpoint = client.endpoint_path(
        project=PROJECT_ID, location=LOCATION, endpoint=ENDPOINT_ID
    )

    response = client.predict(
        endpoint=endpoint, instances=instances, parameters=parameters
    )
    
    predictions = []
    for pred in response.predictions:
        for i in range(len(pred["displayNames"])):
            predictions.append({
                "name": str(pred["displayNames"][i]),
                "confidence": float(pred["confidences"][i]),
                "bbox": list(pred["bboxes"][i])  # Convert bbox to list
    })

    return predictions

# ========== Gemini Enrichment Function ==========
def enrich_with_gemini(disease_name: str):
    try:
        # Description
        prompt_info = f"Give a short description of the plant disease '{disease_name}', its causes, and treatment."
        response_info = gemini_model.generate_content(prompt_info)
        description = response_info.text.strip()

        # Care
        prompt_care = f"What care should be given to a plant affected by {disease_name}?"
        response_care = gemini_model.generate_content(prompt_care)
        care = response_care.text.strip()

        return description, care
    except Exception as e:
        logging.error(f"Gemini error for '{disease_name}': {e}")
        return "Error retrieving description.", "Error retrieving care instructions."

# ========== Flask Route ==========
@app.route('/predict', methods=['POST'])
def predict():
    logging.debug("Received request to /predict endpoint.")

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        file_content = file.read()
        logging.debug(f"File size: {len(file_content)} bytes")

        # Step 1: Detect with Vertex AI
        raw_predictions = predict_image_object_detection(file_content)

        if not raw_predictions:
            return jsonify({"predictions": []})

        # Step 2: Pick top prediction for Gemini enrichment
        top_prediction = max(raw_predictions, key=lambda x: x["confidence"])
        disease_name = top_prediction["name"]

        # Step 3: Single Gemini call for the top prediction
        description, care = enrich_with_gemini(disease_name)

        # Step 4: Attach Gemini results to all predictions
        enriched_predictions = []
        for pred in raw_predictions:
            enriched_predictions.append({
                "name": pred["name"],
                "confidence": round(float(pred["confidence"]) * 100, 2),
                "bbox": list(pred["bbox"]),
                "description": description,
                "care": care
            })

        return jsonify({"predictions": enriched_predictions})

    except Exception as e:
        logging.error(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500
# ========== Main ==========
if __name__ == '__main__':
    app.run(debug=True)
