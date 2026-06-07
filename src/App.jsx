import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Hero />
    <Footer/>
    </>
  )
}

export default App
