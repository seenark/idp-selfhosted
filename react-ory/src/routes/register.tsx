import type { ChangeEvent, FC, FormEvent } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useOryRegister } from "../hooks/ory/register"

interface RegisterFormData { email: string, password: string }

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {}
const RegisterPage: FC<Props> = () => {
  const [formData, setFormData] = useState<RegisterFormData>({ email: "a@a.com", password: "aA@dsdfsdfs" })
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({})

  const { startFlow, submitRegisterForm } = useOryRegister()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    (async () => {
      const res = await startFlow()
      console.log({ res })
    })()
  }, [startFlow])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const { email, password } = formData

    const formErrors: Partial<RegisterFormData> = {}
    if (!validateEmail(email)) {
      formErrors.email = "Invalid email address"
    }
    if (password.length < 8) {
      formErrors.password = "Password must be at least 8 characters"
    }

    if (Object.keys(formErrors).length === 0) {
      console.log("Form submitted", formData)
      // Handle form submission here
    }
    else {
      setErrors(formErrors)
    }

    const res3 = await submitRegisterForm({ email, password })
    console.log({ res3 })
    alert(JSON.stringify(res3))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={
                `mt-1 block w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`
              }
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export const Route = createFileRoute("/register")({
  component: RegisterPage,
})
