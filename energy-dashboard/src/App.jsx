import { useState } from 'react'
import './App.css'
import Header from './Header'
import HeroSectionImage from './assets/HeroSectionImage.jpg'
function App() {

  return (
    <>
      <div>
        <Header/>         
<div className=" relative w-screen h-[80vh] flex justify-center items-center overflow-hidden">
  <img
  src={HeroSectionImage}
  className="max-h-full w-full object-cover"
  alt="Hero"
 />
<div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
</div>


      </div>
    </>
  )
}

export default App
