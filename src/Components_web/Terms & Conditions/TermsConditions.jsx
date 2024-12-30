import React from 'react'
import img from '../../assets_web/two-business-people-are-finalizing-the-agreement-terms-and-conditions-free-vector.jpg'
function TermsConditions() {
  return (
    <div className='container center mx-auto'>
      <h1 className='text-center mt-5 font-bold text-2xl'>Terms and Conditions</h1>
      <img src={img} alt="Terms and Conditions" className='w-100' />
    </div>
  )
}

export default TermsConditions
