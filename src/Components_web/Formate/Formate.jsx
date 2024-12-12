import React from 'react'
import NavBar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './Formate.css'
function Formate({children,Login,useData}) {

    
  return (
  <>
    <NavBar Login={Login} userData={useData}/>
    <div className=''>
      {children}
    </div>
    <Footer />
  </>
  )
}

export default Formate
