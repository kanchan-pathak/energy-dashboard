import { useState } from 'react'
import './App.css'
import Header from './Header'
import HeroSectionImage from './assets/HeroSectionImage.jpg'
function App() {

  return (
    <>
      <div>
        <Header/>         
        <div className=" relative w-screen h-[80vh] flex overflow-hidden">
        <img
        src={HeroSectionImage}
        className="max-h-full w-full object-cover"
        alt="Main Image"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        <div className="absolute left-1/4 -translate-x-1/2 top-1/2 -translate-y-1/2 p-4 w-1/3 h-1/2 rounded-2xl bg-foreground">
        <h1 className='text-primary font-bold '>Will Add Form like control or button </h1></div>
        </div>
      </div>
    </>
  )
}

export default App
