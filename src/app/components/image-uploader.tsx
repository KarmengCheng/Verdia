"use client"
import { useState, type ChangeEvent, type FormEvent, useRef, useEffect } from "react"
import { Upload, X } from "lucide-react"

interface PredictionItem {
  bboxes: number[][]
  confidences: number[]
  displayNames: string[]
  ids: string[]
}

export function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [predictions, setPredictions] = useState<PredictionItem[] | null>(null)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  // Handle image selection
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const objectUrl = URL.createObjectURL(file)
      setImageSrc(objectUrl)
      setPredictions(null) // Clear previous predictions
    }
  }

  // Clear the selected image and reset state
  const handleClear = () => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc) // Clean up the object URL
    }
    setSelectedImage(null)
    setImageSrc(null)
    setPredictions(null)
    setError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = "" // Reset the file input
    }
    // Clear the canvas
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }
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

      const data = await response.json()
      setPredictions(data.predictions)
      console.log("Predictions:", data.predictions)
    } catch (error) {
      setError("Error uploading the image. Please make sure the backend server is running.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Draw bounding boxes when predictions change
  useEffect(() => {
    if (predictions && predictions.length > 0 && canvasRef.current && imageSrc) {
      const img = new Image()
      img.onload = () => drawBoundingBoxes(img)
      img.src = imageSrc
      img.crossOrigin = "anonymous"
    }
  }, [predictions, imageSrc])

  // Calculate dimensions to maintain aspect ratio
  useEffect(() => {
    if (imageSrc && imageContainerRef.current) {
      const img = new Image()
      img.onload = () => {
        if (imageContainerRef.current) {
          const containerWidth = imageContainerRef.current.clientWidth
          const containerHeight = 300 // Fixed height or adjust as needed

          const imageAspectRatio = img.width / img.height
          let finalWidth, finalHeight

          if (img.width > img.height) {
            // Landscape image
            finalWidth = Math.min(containerWidth, img.width)
            finalHeight = finalWidth / imageAspectRatio
          } else {
            // Portrait image
            finalHeight = Math.min(containerHeight, img.height)
            finalWidth = finalHeight * imageAspectRatio
          }

          if (canvasRef.current) {
            canvasRef.current.width = finalWidth
            canvasRef.current.height = finalHeight
            canvasRef.current.style.width = `${finalWidth}px`
            canvasRef.current.style.height = `${finalHeight}px`
          }
        }
      }
      img.src = imageSrc
      img.crossOrigin = "anonymous"
    }
  }, [imageSrc])

  // Draw bounding boxes on the canvas based on the predictions
  const drawBoundingBoxes = (image: HTMLImageElement) => {
    if (!predictions || !predictions.length || !canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (context) {
      // Clear previous drawings
      context.clearRect(0, 0, canvas.width, canvas.height)

      // Draw the image onto the canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height)

      // Process each prediction item in the array
      predictions.forEach((predictionItem) => {
        // Draw the bounding boxes for this prediction item
        if (predictionItem.bboxes && predictionItem.displayNames) {
          predictionItem.bboxes.forEach((bbox, index) => {
            if (index < predictionItem.displayNames.length) {
              // Vertex AI format: [ymin, xmin, ymax, xmax]
              const [xmin, xmax, ymin, ymax] = bbox

              // Calculate width and height
              const width = xmax - xmin
              const height = ymax - ymin

              // Draw rectangle - using normalized coordinates (0-1)
              context.beginPath()
              context.rect(xmin * canvas.width, ymin * canvas.height, width * canvas.width, height * canvas.height)
              context.lineWidth = 2
              context.strokeStyle = "blue"
              context.stroke()

              // Only add labels for larger boxes to avoid clutter
              if (width * canvas.width > 30 && height * canvas.height > 20) {
                const confidence = predictionItem.confidences
                  ? `${(predictionItem.confidences[index] * 100).toFixed(0)}%`
                  : ""

                // Add small label
                const labelText = confidence ? `${confidence}` : ""
                if (labelText) {
                  context.font = "10px Arial"
                  const textWidth = context.measureText(labelText).width

                  // Add label background
                  context.fillStyle = "rgba(0, 0, 255, 0.7)"
                  context.fillRect(xmin * canvas.width, ymin * canvas.height - 14, textWidth + 4, 14)

                  // Add label text
                  context.fillStyle = "white"
                  context.fillText(labelText, xmin * canvas.width + 2, ymin * canvas.height - 3)
                }
              }
            }
          })
        }
      })
    }
  }

  // Get all unique display names from all predictions
  const getAllDisplayNames = () => {
    if (!predictions || !predictions.length) return []

    const allNames: string[] = []
    predictions.forEach((predItem) => {
      if (predItem.displayNames) {
        predItem.displayNames.forEach((name) => {
          if (!allNames.includes(name)) {
            allNames.push(name)
          }
        })
      }
    })

    return allNames
  }

  // Count occurrences of each display name
  const getDisplayNameCounts = () => {
    if (!predictions || !predictions.length) return {}

    const counts: Record<string, number> = {}
    predictions.forEach((predItem) => {
      if (predItem.displayNames) {
        predItem.displayNames.forEach((name) => {
          counts[name] = (counts[name] || 0) + 1
        })
      }
    })

    return counts
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white border-[#f2f2f2] border p-6 rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-6">
          {!imageSrc ? (
            <div
              className="h-[300px] relative flex flex-col items-center justify-center rounded-lg p-6 cursor-pointer border-2 border-gray-200 bg-gray-50 transition-colors hover:bg-gray-100"
              onClick={() => fileInputRef.current?.click()}
            >
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} ref={fileInputRef} />
              <Upload className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 text-center">Click to upload your image</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
            </div>
          ) : (
            <div
              className="relative h-[300px] flex items-center justify-center rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
              ref={imageContainerRef}
            >
              <div className="relative flex items-center justify-center">
                {/* The actual image is drawn on canvas, this img element is hidden */}
                <img
                  ref={imageRef}
                  src={imageSrc || "/placeholder.svg"}
                  alt="Selected"
                  className="hidden"
                  crossOrigin="anonymous"
                />
                <canvas ref={canvasRef} className="max-w-full max-h-[280px]" />

                {/* Clear button (positioned in the top-right corner) */}
                <button
                  type="button"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear image</span>
                </button>
              </div>
            </div>
          )}

          {predictions && predictions.length > 0 ? (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="font-medium mb-2">Predictions:</h2>
              <ul className="list-disc pl-5">
                {Object.entries(getDisplayNameCounts()).map(([name, count], index) => (
                  <li key={index} className="text-sm">
                    {name}: {count} instance{count !== 1 ? "s" : ""}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            predictions && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="font-medium">No objects detected</h2>
              </div>
            )
          )}
        </div>

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
            {isLoading ? "Processing..." : "Analyze Image"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}

