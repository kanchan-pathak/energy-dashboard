import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
const BACKEND_URL = import.meta.env.BACKEND_URL
const BACKEND_GITHUB_TOKEN=import.meta.env.BACKEND_GITHUB_TOKEN

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault() 
  // try {
  //   const res = await axios.post(
  //       "https://legendary-dollop-v7p7vv6gq5cw6wj-4000.app.github.dev/api/v1/users/login",
  //       { email, password },
  //       {
  //         headers:{
  //           'X-Github-Token':BACKEND_GITHUB_TOKEN
  //         },
  //         withCredentials: true }
  //   )
  //   console.log("Login success:", res.data)
  //   //navigate("/dashboard") 
  // } catch (error) {
  //   console.error("Login failed:", error.response?.data?.message || error.message)
  //   alert("Login failed: " + (error.response?.data?.message || "Unknown error"))
  // }
  //   console.log({ email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border text-primary border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 text-primary border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          New here?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
