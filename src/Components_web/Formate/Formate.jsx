import React from 'react'
import NavBar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './Formate.css'
import { useNavigate, useParams } from 'react-router-dom'
function Formate({children,Login,useData}) {
const navigate=useNavigate()
const {isshow}=useParams()

    // full page http://localhost:5173/terms-and-conditions/isshow
console.log(isshow,'isshow');

  return (
  <>
{
  isshow ?
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
