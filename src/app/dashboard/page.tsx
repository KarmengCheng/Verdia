import type React from "react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100">
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center border-b border-green-200 bg-white">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
          <span className="text-xl font-bold text-green-800">PlantHealth</span>
        </div>
        <Link href="/" className="text-sm font-medium text-green-600 hover:text-green-700">
          Sign Out
        </Link>
      </header>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Plant Disease Detection Dashboard</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upload a Plant Image</h2>
            <p className="text-sm text-gray-600 mb-4">
              Take or upload a photo of your plant to detect diseases and get treatment recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-green-600 hover:bg-green-700">Upload Image</Button>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Take Photo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">Plant Library</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Browse common plants and learn about their care requirements
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M2.5 19h19" />
                  <path d="M22 5c0 9-7 12.5-10.5 12.5S2 14 2 5" />
                </svg>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">Disease Database</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Information about common plant diseases and treatment options
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">Treatment Guide</h3>
                <p className="text-sm text-gray-600 mt-1">Step-by-step guides for treating common plant diseases</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 border-t border-green-200">
        <div className="text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} PlantHealth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function Button({
  children,
  className = "",
  variant = "default",
  ...props
}: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline"
  [key: string]: any
}) {
  const baseClasses =
    "px-4 py-2 rounded-md font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
  const variantClasses =
    variant === "default"
      ? "bg-green-600 text-white hover:bg-green-700"
      : "bg-white border border-current hover:bg-gray-50"

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  )
}

