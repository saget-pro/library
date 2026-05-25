import React, { useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from "sonner"

function ForgotPassword() {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [resetLink, setResetLink] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      if (!email) {
        return toast.error("Email is required")
      }

      setLoading(true)

      const res = await axios.post(
        "http://localhost:3000/forgot-password",
        { email }
      )

      toast.success(res.data.message)

      setResetLink(res.data.resetLink)

      setEmail("")

    } catch (error) {

      toast.error(
        error.response?.data?.error || "Error occurred"
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">

      <Toaster richColors position="top-right" />

      <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-xl w-[400px]">

        <h2 className="text-xl mb-4 text-center">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 p-2"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {resetLink && (
          <div className="mt-4 text-sm break-all">
            <p className="text-green-400">Reset Link:</p>
            <a
              href={resetLink}
              className="text-cyan-300 underline"
            >
              {resetLink}
            </a>
          </div>
        )}

      </form>
    </div>
  )
}

export default ForgotPassword