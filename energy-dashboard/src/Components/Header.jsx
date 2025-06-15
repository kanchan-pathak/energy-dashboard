import { useNavigate } from 'react-router-dom'
import LogoCard from "./LogoCard"
import PrimaryButton from "./PrimaryButton"
const Header=()=>{
const navigate = useNavigate()
return(
    <div className="w-screen bg-foreground h-[7vh] flex justify-between">
        <LogoCard/>
        <div className= "w-96 flex items-center"><ul className="w-full flex justify-around text-primary font-bold text-lg">
            <li className="hover:text-primaryhover-light">About</li>
            <li className="hover:text-primaryhover-light" onClick={()=>navigate("/")}>Home</li>
            <li className="hover:text-primaryhover-light">Contact Us</li></ul></div>
        <PrimaryButton buttonText="Login" buttonFunction={()=>navigate("/login")}/>
    </div>
)
}
export default Header