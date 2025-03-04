import React, { useEffect, useState } from 'react'
import NavBar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './Formate.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getWebNavbar, getWebSocialMedia } from '../../Pages_admin/webApi/webApi'
function Formate({ children, Login, useData }) {
  const navigate = useNavigate()
  const { isshow } = useParams()
  const [navdata,setnavdata]=useState(null)
  const [SocialMediadata,setSocialMediadata]=useState(null)


const getdataofnav = async () =>{
  const data = await getWebNavbar();
  setnavdata(data)
  return data
}


const getSocialMediadata = async () =>{
  const data = await getWebSocialMedia();
  setSocialMediadata(data)
  return data
}



  return (
    <>
      {
        isshow === 'true' ?
          null
          :
          <NavBar Login={Login} userData={useData} navdata={navdata} getdataofnav={getdataofnav} getSocialMediadata={getSocialMediadata} />
      }

      <div className=''>
        {children}
      </div>
      <Footer navdata={navdata} SocialMediadata={SocialMediadata} />
    </>
  )
}

export default Formate
