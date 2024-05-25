import { useEffect, useState } from 'react'
import image from './assets/TH-en-20240506-popsignuptwoweeks-perspective_alpha_website_small.jpg'
import GetStarted from './components/GetStarted'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { useNavigate } from 'react-router'

function Root() {
  const navigate = useNavigate()
  useEffect(()=> {
    console.log(localStorage.getItem('user'))
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser.email) {
      navigate('/home')
    }
  }, [])

  return (
    <>
      <div style={{height:"85vh", width: "100%", position:"absolute", left: 0, top: 0, backgroundImage: `url(${image})`, filter: 'brightness(80%)'}}>
        <Navbar location='register'/>
        <GetStarted/>
      </div>
      
    </>
  )
}

export default Root
