import React from 'react'
import { useState } from 'react'
import { Toaster, toast } from "sonner"
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [full_name, setfull_name] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const navigate = useNavigate()

  const hanle_register = async () => {
    try {
      if (!full_name || !email || !password) {
        toast.error("all fields are required")
        return
      }

      const res = await axios.post("http://localhost:3000/create", {
        full_name,
        email,
        password
      })

      toast.success(res.data.message)
      setfull_name("")
      setemail("")
      setpassword("")
      navigate("/")

    } catch (error) {
      return toast.error(error.response?.data?.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black px-4">

      <Toaster richColors position="top-right" />

      {/* CARD */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account 
        </h1>

        <p className="text-center text-gray-300 mb-6">
          Join the Library System today
        </p>

        {/* FULL NAME */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter full name"
            value={full_name}
            onChange={(e) => setfull_name(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={hanle_register}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 transition font-semibold shadow-lg"
        >
          Register
        </button>

        {/* LOGIN LINK */}
        <div className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/" className="text-cyan-300 hover:text-cyan-200 font-medium">
            Login
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Register