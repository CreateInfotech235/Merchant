import React from 'react'
import NavBar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './Formate.css'
import { useNavigate, useParams } from 'react-router-dom'
function Formate({children,Login,useData}) {
const navigate=useNavigate()
const {isshow}=useParams()


  return (
  <>
{
  isshow==='true' ?
    null
    :
    <NavBar Login={Login} userData={useData}/>
}

    <div className=''>
      {children}
    </div>
    <Footer />
  </>
  )
}

export default Formate
