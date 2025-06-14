import { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Header.jsx'
import HomePage from './Pages/HomePage.jsx'
import axios from 'axios'
function App() {
const [jokes,setJokes]=useState([])

useEffect(()=>{
  axios.get('https://legendary-dollop-v7p7vv6gq5cw6wj-3000.app.github.dev/api/v1/jokes',{
  withCredentials: true})
  .then((response)=>{
    setJokes(response.data)
  })
  .catch((error)=>{
    console.log("This i sthe error: ",error)
  })
})
  return (
    <>
      <div>
        <Header/>
        {jokes.map((joke,index)=>(
          <div className='bg-amber-50 text-amber-900' key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
            </div>
        ))}    
        <HomePage/>
      </div>
    </>
  )
}

export default App
