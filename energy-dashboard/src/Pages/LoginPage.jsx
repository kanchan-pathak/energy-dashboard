import React, { useState } from "react"
import { Link , useNavigate} from "react-router-dom"
import axios from 'axios'

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault() 
  try {
    const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,
        { email, password },
        {
          headers:{
            'Content-Type': "application/json"
          },
          withCredentials: true }
    )
   console.log("Login Success:", response.data);
    alert(response.data.message);
    navigate("/dashboard") 
  } catch (error) {
     if (error.response) {
      console.error("Login Error:", error.response.data);
      alert(error.response.data.message);
    } else {
      console.error("Unknown Error:", error.message);
      alert("Something went wrong. Please try again.");
    }
  }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-primaryhover-light">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaryhover"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaryhover"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-primaryhover-light text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          New here?{" "}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
