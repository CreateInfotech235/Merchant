import React from "react";
import clientimg from "../../assets_admin/clientimg.png";
import clientimg2 from "../../assets_admin/clientimg2.png";
import edit from "../../assets_admin/edit.png";
import deleteimg from "../../assets_admin/deleteimg.png";


const ClientReview = () => {
  return (
    <>
      <div className="client-review">
        <div className="client-button d-flex justify-content-end">
        <button
                type="button"
                class="btn rounded-2 m-3 p-2 fw-bold"
                style={{
                  width: "150px",
                  background: "#d65246",
                  color: "white",
                }}>Add Review</button>
        </div>

        <label class="p-0 ">title </label>
        <div className="title-btn d-flex  align-items-center ">
          <div className="client-input col-4">
           
        
            <input type="text " className="clients-input border-0 p-2 w-100 col-5" />
          </div>
          <div className="save2 ms-5">
         
              <button
                type="button"
                class="btn rounded-2 m-3 p-2 fw-bold"
                style={{
                  width: "150px",
                  background: "#d65246",
                  color: "white",
                }}
              >Save</button>
          </div>
        </div>

<h2 className="review mt-5 fw-bold mb-4">Reviews</h2>
        <div className="clients-information d-flex justify-content-between  align-items-center w-100 row">
          <div className="client-imgs col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12 mb-3">
            <img src={clientimg} />
          </div>

            <div className="table-img col-xxl-9 col-xl-9 col-lg-9 col-md-10 col-sm-12 col-12">
              <div className="client-info table-responsive">
              <table class=" table-borderless w-100 mb-3">
 
  <tbody>
    <tr>
      <th scope="row" style={{width:"100px"}}>name :</th>
      <td>michallow hudsone</td>
    </tr>
    <tr>
      <th scope="row">email :</th>
      <td>michallow1978@demo.com</td>

    </tr>
    <tr>
      <th scope="row">review :</th>
      <td colspan="2">One Shock for Women is a bold expression of the CK One range, with a modern, edgy twist. jsefjfnfhuenwrsef
      sjdrhwsjdrhnsjdhsmndksndfm.</td>
     
    </tr>
  </tbody>
</table>
              </div>
              </div>

              <div className="button-img ms-3  col-xxl-1 col-xl-1  col-lg-1 col-md-12 col-sm-12 col-12 d-md-flex justify-content-md-end d-sm-flex justify-content-sm-end d-flex justify-content-end" >
                {" "}
                <button className="edit-btn me-2">
                  <img src={edit} />
                </button>
                <button className="delete-btn">
                  <img src={deleteimg} />
                </button>
              </div>
            </div>
          </div>
      
          <div className="clients-information d-flex justify-content-between  align-items-center w-100 row">
          <div className="client-imgs col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12 mb-3">
            <img src={clientimg} />
          </div>

            <div className="table-img col-xxl-9 col-xl-9 col-lg-9 col-md-10 col-sm-12 col-12">
              <div className="client-info table-responsive">
              <table class=" table-borderless w-100 mb-3">
 
  <tbody>
    <tr>
      <th scope="row" style={{width:"100px"}}>name :</th>
      <td>michallow hudsone</td>
    </tr>
    <tr>
      <th scope="row">email :</th>
      <td>michallow1978@demo.com</td>

    </tr>
    <tr>
      <th scope="row">review :</th>
      <td colspan="2">One Shock for Women is a bold expression of the CK One range, with a modern, edgy twist. jsefjfnfhuenwrsef
      sjdrhwsjdrhnsjdhsmndksndfm.</td>
     
    </tr>
  </tbody>
</table>
              </div>
              </div>

              <div className="button-img ms-3  col-xxl-1 col-xl-1  col-lg-1 col-md-12 col-sm-12 col-12 d-md-flex justify-content-md-end d-sm-flex justify-content-sm-end d-flex justify-content-end" >
                {" "}
                <button className="edit-btn me-2">
                  <img src={edit} />
                </button>
                <button className="delete-btn">
                  <img src={deleteimg} />
                </button>
              </div>
            </div>
      
        
      






       
     
    </>
  );
};

export default ClientReview;
