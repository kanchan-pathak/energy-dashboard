import { useNavigate } from 'react-router-dom'
import LogoCard from "./LogoCard"
import PrimaryButton from "./PrimaryButton"
import axios from 'axios'
const Header=({ isLoggedIn, setIsLoggedIn })=>{
const navigate = useNavigate()
const handleLogout=async()=>{
    try {
    const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`,{},
        {
          headers:{
            'Content-Type': "application/json"
          },
          withCredentials: true }
        )
           console.log("Logout Success:", response.data);
   setIsLoggedIn(false)
    alert(response.data.message);
    navigate("/") 
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
return(
    <div className="w-screen bg-foreground h-[7vh] flex justify-between">
        <LogoCard/>
        <div className= "w-96 flex items-center"><ul className="w-full flex justify-around text-primary font-bold text-lg">
            <li className="hover:text-primaryhover-light">About</li>
            <li className="hover:text-primaryhover-light" onClick={()=>navigate("/")}>Home</li>
            <li className="hover:text-primaryhover-light">Contact Us</li></ul></div>
        {isLoggedIn?<PrimaryButton buttonText="Logout" buttonFunction={handleLogout}/>:<PrimaryButton buttonText="Login" buttonFunction={()=>navigate("/login")}/>} 
    </div>
)
}
export default Header