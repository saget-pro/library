import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Toaster, toast } from "sonner"

function ResetPassword() {

  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReset = async (e) => {
    e.preventDefault()

    try {

      if (!password) {
        return toast.error("Password required")
      }

      setLoading(true)

      const res = await axios.post(
        `http://localhost:3000/reset-password/${token}`,
        { password }
      )

      toast.success(res.data.message)

      setTimeout(() => {
        navigate("/")
      }, 1500)

    } catch (error) {

      toast.error(
        error.response?.data?.error || "Invalid or expired token"
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">

      <Toaster richColors position="top-right" />

      <form onSubmit={handleReset} className="bg-white/10 p-8 rounded-xl w-[350px]">

        <h2 className="text-xl mb-4 text-center">Reset Password</h2>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 text-black"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 p-2"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

      </form>
    </div>
  )
}

export default ResetPassword