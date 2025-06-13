import HeroSectionImage from '../assets/HeroSectionImage.jpg'
import PrimaryButton from './PrimaryButton.jsx'
import React, { useState } from "react"
const HeroSection=()=>{
    const [inputValue, setInputValue] = useState("");
    const handleChange = (event) => {
    setInputValue(event.target.value);
  };
    return(
    <div className=" relative w-screen h-[80vh] flex overflow-hidden">
    <img
    src={HeroSectionImage}
    className="max-h-full w-full object-cover"
    alt="Main Image"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
    <div className="absolute left-1/4 -translate-x-1/2 top-1/2 -translate-y-1/2 p-15 w-1/3 h-1/2 rounded-2xl bg-foreground flex-col items-center-safe">
    <p className='text-primary text-3xl font-bold my-4 '>Join India's most popular energy supplier.</p>
    <p className="text-primary text-lg font-semibold my-6 ">Enter your postcode to get a quote:</p>
    <div className="flex items-center-safe rounded-xl h-1/4 shadow-lg">
   <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type your pincode..."
        className="flex-1 text-primary p-5 h-full border-none focus:outline-none font-semibold"
      />
    <button className="p-2 h-full rounded-r-xl bg-primary hover:bg-primaryhover text-foreground font-medium" >Get a Quote</button>
        </div>
    </div>
    </div>
    )
}
export default HeroSection