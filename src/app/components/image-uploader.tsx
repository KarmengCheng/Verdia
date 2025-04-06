"use client"
import { useState, type ChangeEvent, type FormEvent, useRef, useEffect } from "react"
import { Upload, X, Info, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"

interface Prediction {
  name: string
  confidence: number
  bbox: number[]
  description: string
  care: string
}

interface PredictionResponse {
  predictions: Prediction[]
}

export function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [predictions, setPredictions] = useState<Prediction[] | null>(null)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const [canvasReady, setCanvasReady] = useState<boolean>(false)

  // Handle image selection with a completely revised approach
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Clean up previous object URL if it exists
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc)
      }

      // Reset states
      setPredictions(null)
      setCanvasReady(false)

      // Create new object URL
      const objectUrl = URL.createObjectURL(file)
      setSelectedImage(file)
      setImageSrc(objectUrl)

      console.log("New image selected:", objectUrl)
    }
  }

  // Clear the selected image and reset state
  const handleClear = () => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc)
    }
    setSelectedImage(null)
    setImageSrc(null)
    setPredictions(null)
    setError("")
    setCanvasReady(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    // Clear the canvas
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }

    console.log("Image cleared")
  }

  // Handle form submission and send the image to backend
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!selectedImage) {
      setError("Please select an image!")
      return
    }

    setIsLoading(true)
    setError("")

    const formData = new FormData()
    formData.append("file", selectedImage)

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }

      const data: PredictionResponse = await response.json()
      setPredictions(data.predictions)
      console.log("Predictions:", data.predictions)
    } catch (error) {
      setError("Error uploading the image. Please make sure the backend server is running.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate dimensions and draw image when image source changes
  useEffect(() => {
    if (!imageSrc) return

    console.log("Image source changed, loading image")

    const img = new Image()

    img.onload = () => {
      console.log("Image loaded successfully")

      if (!imageContainerRef.current || !canvasRef.current) {
        console.error("Container or canvas ref not available")
        return
      }

      const containerWidth = imageContainerRef.current.clientWidth
      const containerHeight = 400

      const imageAspectRatio = img.width / img.height
      let finalWidth, finalHeight

      if (img.width > img.height) {
        finalWidth = Math.min(containerWidth, img.width)
        finalHeight = finalWidth / imageAspectRatio
      } else {
        finalHeight = Math.min(containerHeight, img.height)
        finalWidth = finalHeight * imageAspectRatio
      }

      // Set canvas dimensions
      canvasRef.current.width = finalWidth
      canvasRef.current.height = finalHeight
      canvasRef.current.style.width = `${finalWidth}px`
      canvasRef.current.style.height = `${finalHeight}px`

      // Draw image on canvas
      const context = canvasRef.current.getContext("2d")
      if (context) {
        context.clearRect(0, 0, finalWidth, finalHeight)
        context.drawImage(img, 0, 0, finalWidth, finalHeight)
        console.log("Image drawn on canvas")
        setCanvasReady(true)
      }

      // If we have predictions, draw bounding boxes
      if (predictions && predictions.length > 0) {
        drawBoundingBoxes(img)
      }
    }

    img.onerror = () => {
      console.error("Error loading image")
      setError("Error loading image. Please try another file.")
    }

    img.src = imageSrc
    img.crossOrigin = "anonymous"

    // If the image is already cached, the onload event might not fire
    if (img.complete) {
      console.log("Image already loaded (cached)")
      img.onload(new Event("load") as any)
    }

    return () => {
      // Clean up
      img.onload = null
      img.onerror = null
    }
  }, [imageSrc, predictions])

  // Draw bounding boxes on the canvas based on the predictions
  const drawBoundingBoxes = (image: HTMLImageElement) => {
    if (!predictions || !predictions.length || !canvasRef.current) {
      console.log("Cannot draw bounding boxes: missing predictions or canvas")
      return
    }

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (context) {
      // Clear previous drawings
      context.clearRect(0, 0, canvas.width, canvas.height)

      // Draw the image onto the canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      console.log("Image redrawn for bounding boxes")

      // Process each prediction
      predictions.forEach((prediction, index) => {
        // Get bounding box coordinates [x1, y1, x2, y2]
        const [x1, x2, y1, y2] = prediction.bbox

        // Calculate width and height
        const width = x2 - x1
        const height = y2 - y1

        // Get color from expanded palette
        const color = getBoxColor(index)

        // Draw rectangle with semi-transparent fill
        context.beginPath()
        context.rect(x1 * canvas.width, y1 * canvas.height, width * canvas.width, height * canvas.height)
        context.lineWidth = 2
        context.strokeStyle = color
        context.stroke()

        // Add semi-transparent fill
        context.fillStyle = `${color}20` // 20 is hex for 12% opacity
        context.fillRect(x1 * canvas.width, y1 * canvas.height, width * canvas.width, height * canvas.height)
      })

      console.log("Bounding boxes drawn")
    }
  }

  // Get confidence level color
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-500"
    if (confidence >= 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Format the description text with proper styling
  const formatDescription = (text: string) => {
    // Replace bold text markers with spans
    const boldRegex = /\*\*(.*?)\*\*/g
    const formattedText = text.replace(boldRegex, '<span class="font-bold">$1</span>')

    // Split by paragraphs
    const paragraphs = formattedText.split(/\n\n/)

    return (
      <>
        {paragraphs.map((paragraph, i) => {
          // Check if paragraph contains bullet points
          if (paragraph.includes("* ")) {
            const listItems = paragraph.split("* ").filter((item) => item.trim())
            return (
              <div key={i} className="mb-2">
                <ul className="list-disc pl-5 space-y-1">
                  {listItems.map((item, j) => (
                    <li key={j} dangerouslySetInnerHTML={{ __html: item.trim() }} />
                  ))}
                </ul>
              </div>
            )
          } else {
            return <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: paragraph }} />
          }
        })}
      </>
    )
  }

  // Get box color for a specific index - expanded color palette
  const getBoxColor = (index: number) => {
    // Extended color palette with 20 distinct colors
    const colors = [
      "#FF5733", // Red-Orange
      "#33FF57", // Green
      "#3357FF", // Blue
      "#F033FF", // Magenta
      "#FF33A8", // Pink
      "#33FFF5", // Cyan
      "#FFD700", // Gold
      "#9370DB", // Medium Purple
      "#FF6347", // Tomato
      "#20B2AA", // Light Sea Green
      "#FF8C00", // Dark Orange
      "#00FA9A", // Medium Spring Green
      "#4682B4", // Steel Blue
      "#9932CC", // Dark Orchid
      "#FF4500", // Orange Red
      "#00CED1", // Dark Turquoise
      "#8A2BE2", // Blue Violet
      "#32CD32", // Lime Green
      "#FF1493", // Deep Pink
      "#1E90FF", // Dodger Blue
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="h-screen pb-8">
      <div className="w-full max-w-4xl mx-auto bg-white border-[#f2f2f2] border p-6 rounded-2xl shadow-lg overflow-y-auto max-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-center">Plant Disease Analyzer</h1>
          <Badge variant="outline" className="bg-gray-100 text-gray-700">
            Powered by Gemini
          </Badge>
        </div>

        <div className="flex flex-col gap-6">
          {/* Image upload and display */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-6">
                {!imageSrc ? (
                  <div
                    className="h-[400px] relative flex flex-col items-center justify-center rounded-lg p-6 cursor-pointer border-2 border-dashed border-gray-200 bg-gray-50 transition-colors hover:bg-gray-100"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                    />
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 text-center">Click to upload your plant image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Image container - takes up 2/3 of the space */}
                    <div
                      className="relative h-[400px] md:col-span-2 flex items-center justify-center rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
                      ref={imageContainerRef}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Fallback image display */}
                        {!canvasReady && (
                          <img
                            src={imageSrc || "/placeholder.svg"}
                            alt="Selected plant"
                            className="max-w-full max-h-[380px] object-contain"
                          />
                        )}

                        {/* Canvas for drawing bounding boxes */}
                        <canvas
                          ref={canvasRef}
                          className={`max-w-full max-h-[380px] ${canvasReady ? "block" : "hidden"}`}
                        />

                        {/* Clear button (positioned in the top-right corner) */}
                        <button
                          type="button"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-800/70 hover:bg-gray-800 flex items-center justify-center text-white"
                          onClick={handleClear}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Clear image</span>
                        </button>
                      </div>
                    </div>

                    {/* Detection list - takes up 1/3 of the space */}
                    {predictions && predictions.length > 0 ? (
                      <div className="md:col-span-1 bg-gray-50 rounded-lg border border-gray-200 p-3 overflow-auto max-h-[400px]">
                        <h3 className="font-medium text-sm mb-2 text-gray-700">Detected Issues</h3>
                        <div className="space-y-2">
                          {predictions.map((prediction, index) => (
                            <div
                              key={index}
                              className="flex items-center p-2 rounded-md bg-white border border-gray-100 shadow-sm"
                              style={{ borderLeftColor: getBoxColor(index), borderLeftWidth: "3px" }}
                            >
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{prediction.name}</p>
                                <p className="text-xs text-gray-500">Confidence: {prediction.confidence.toFixed(1)}%</p>
                              </div>
                              <div
                                className="w-3 h-3 rounded-full ml-2"
                                style={{ backgroundColor: getBoxColor(index) }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="md:col-span-1 bg-gray-50 rounded-lg border border-gray-200 p-3 flex items-center justify-center">
                        <p className="text-sm text-gray-500 text-center">
                          {isLoading ? "Analyzing image..." : "Click 'Analyze Image' to detect issues"}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  {imageSrc && (
                    <button
                      type="button"
                      className="py-2 px-6 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="submit"
                    className="py-2 px-6 bg-[#14c984] text-white font-bold rounded-lg hover:bg-[#10b676] ml-auto"
                    disabled={!selectedImage || isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      "Analyze Image"
                    )}
                  </button>
                </div>
              </div>
            </form>
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="space-y-4">
            {predictions && predictions.length > 0 ? (
              <Card>
                <CardContent className="pt-6 overflow-y-auto max-h-[60vh]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{predictions[0].name}</h3>
                        <Badge className={getConfidenceColor(predictions[0].confidence)}>
                          {predictions[0].confidence.toFixed(1)}%
                        </Badge>
                      </div>

                      {predictions.length > 1 && (
                        <div className="text-xs text-gray-500">+{predictions.length - 1} spots detected</div>
                      )}
                    </div>

                    <div className="space-y-4 pt-2">
                      <div>
                        <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                          <Info className="h-4 w-4" /> Description
                        </h4>
                        <div className="text-sm text-gray-600 prose prose-sm max-w-none">
                          {formatDescription(predictions[0].description)}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                          <AlertCircle className="h-4 w-4" /> Care Instructions
                        </h4>
                        <div className="text-sm text-gray-600 prose prose-sm max-w-none">
                          {formatDescription(predictions[0].care)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : predictions && predictions.length === 0 ? (
              <div className="h-full flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Info className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No issues detected</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Your plant appears to be healthy. No diseases or pests were detected in the image.
                  </p>
                </div>
              </div>
            ) : imageSrc ? (
              <div className="h-full flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Info className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Ready to analyze</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Click the "Analyze Image" button to detect any plant diseases or issues.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Upload an image</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Upload a clear image of your plant to analyze for diseases and issues.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

