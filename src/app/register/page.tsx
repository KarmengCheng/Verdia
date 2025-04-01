import Link from "next/link"
import { RegisterForm } from "@/components/register-form"

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100">
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-center border-b border-green-200">
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
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
                <p className="text-sm text-gray-600 mt-2">Join PlantHealth to identify and treat plant diseases</p>
              </div>
              <RegisterForm />
              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link href="/" className="text-green-600 hover:text-green-700 font-medium">
                    Sign in
                  </Link>
                </p>
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

