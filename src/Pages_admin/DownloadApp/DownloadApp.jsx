import React from 'react'
import input from '../../assets_admin/input.png'

const DownloadApp = () => {
  return (
    <>
    <div className="save1 d-flex justify-content-end"> <button type="button" class="btn rounded-2 m-3 p-2 fw-bold"
          style={{
            width: "150px",
            background: "#d65246",
            color: "white",
          
          }}>Save</button></div>


    <label class="ps-0 pb-3 text-black-50">title *</label><br/>
    <input type="text" className="w-100 border-0 p-3 rounded-2 mb-3"  placeholder="download mighty delivery now."/><br/>
    <label class="ps-0 pb-3 text-black-50">description</label><br/>
    <input type="text" className="w-100 border-0 p-5 rounded-2 mb-3"  placeholder="download mighty delivery now."/><br/>

    <label class="ps-0 pb-3 text-black-50">download footer content *</label><br/>
    <input type="text" className="w-100 border-0 p-3 rounded-2 mb-3"  placeholder="download mighty delivery now."/><br/>

    <div class="row d-xxl-flex flex-xxl-row justify-content-xxl-between w-xxl-75 w-xl-75 w-lg-100 w-md-100 w-sm-100 w-100 align-items-center ">
        <div className="col-xxl-2 p-2 col-xl-3 col-lg-3  col-md-4 col-sm-6 col-10 m-2">
          <div>
          <label class="text-black-50 ps-0">select file</label>
          </div>
          <div className="bg-white p-2 rounded-3 img d-flex flex-column-reverse justify-content-center align-items-center" style={{ cursor:"pointer"}}>
            <div className="label">
              <label htmlFor="formFile" className="form-labels">
                select file
              </label>
            </div>
            <div className="image">
              <img src={input} className="car12 p-4" />
              <input className="form-control" type="file" id="formFile" />
            </div>
          </div>
        </div>
      


    </div>
    </>
  )
}

export default DownloadApp