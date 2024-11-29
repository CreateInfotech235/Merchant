import React from 'react'
import NavBar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './Formate.css'
function Formate({children}) {
    
  return (
  <>
    <NavBar />
    <div className='mt-[113px] '>
      {children}
    </div>
    <Footer />
  </>
  )
}

export default Formate
