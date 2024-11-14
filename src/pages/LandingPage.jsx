import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/hero'
import Footer from '../components/Footer'
import AsthmaTips from '../components/AsthmaTipsAndResources'


const LandingPage = () => {
  return (
    <div>
         <div className='bg-white'>
        
      <Navbar/>
      <Hero/>
      <AsthmaTips/>
      <Footer/>
      
          </div>
       
      
      </div>
  )
}

export default LandingPage
  