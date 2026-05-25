import React, { useState } from 'react'
import { Toaster, toast } from "sonner"
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [confirm, setconfirm] = useState("")
  const [loading, setloading] = useState(false)

  const handle_login = async (e) => {
    e.preventDefault()

    try {

      if (!email || !password) {
        return toast.error("All fields are required")
      }
      if(password  !=confirm){
        return toast.error("password not match")
      }

      setloading(true)

      const res = await axios.post(
        "http://localhost:3000/login",   // ✅ FIXED (use proxy instead of localhost:3000)
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      )

      toast.success(res.data.message)

      setemail("")
      setpassword("")

      // localStorage.setItem("user", JSON.stringify(res.data.user))

      navigate("/dashboard")

    } catch (error) {

      toast.error(
        error.response?.data?.error ||
        "Something went wrong"
      )

    } finally {
      setloading(false)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-black px-4">

      <Toaster richColors position="top-right" />

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white">

        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-300 mb-6">
          Login to continue
        </p>

        <form onSubmit={handle_login}>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full mb-2 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
           <input
            type="password"
            placeholder="comfirm password"
            value={confirm}
            onChange={(e) => setconfirm(e.target.value)}
            className="w-full mb-2 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end mt-2 mb-6">

            <Link
              to="/forgot-password"
              className="text-sm text-cyan-300 hover:text-cyan-200"
            >
              Forgot Password?
            </Link>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 transition font-semibold shadow-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* REGISTER */}
        <p className="mt-6 text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-300 hover:text-cyan-200">
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login