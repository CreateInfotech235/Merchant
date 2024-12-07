import React from 'react'
import './Table.css'
import filter from '../../assets_admin/filter-img.png'

const Table = () => {
  return (
    <div className="table1 bg-light p-3 ms-0 m-2">
     <div className="table-content d-xxl-flex justify-content-xxl-between d-sm-flex flex-sm-row w-100 mb-4" style={{width:"450px"}}>
    <div>
        <h4 class="fw-bold text-capitalize">Top ordered branch list</h4>
    </div>
    <div class="d-flex justify-content-end align-items-center">
        <button type="button" class="filter border-0 rounded-2 p-1 ps-3 pe-3 w-100 w-sm-25 btn" style={{color:"white", background:"#253a71 "}}>
            Filter
            <img src={filter} class="ps-3"/>
        </button>
    </div>
</div>


    <table className="table-borderless w-100 h-100 bg-light">
  
        <thead >
        <tr class="pb-3" style={{fontSize:"12px"}}>
            <th scope="col" class="pb-3 " >Branch name</th>
            <th scope="col" class="pb-3 " >Product type</th>
            <th scope="col" class="pb-3 ">Order</th>
            <th scope="col" class="pb-3 ">Rating</th>
        </tr>
        </thead>
        <tbody >
        <tr   style={{fontSize:"12px"}}>
            <td class="pb-3">New York</td>
            <td class="pb-3 ">Doc and object</td>
            <td class="pb-3 " >12,000</td>
            <td class="pb-3 ">****</td>
        </tr>
        <tr  style={{fontSize:"12px"}}>
            <td scope="row" class="pb-3 ">California</td>
            <td class="pb-3 ">Objects</td>
            <td class="pb-3">5,000</td>
            <td class="pb-3 "></td>
        </tr>
        <tr  style={{fontSize:"12px"}}>
            <td class="pb-3 " scope="row">Louisiana</td>
            <td class="pb-3 ">Documents</td>
            <td class="pb-3 ">4,480</td>
            <td class="pb-3 ">****</td>
        </tr>
        <tr  style={{fontSize:"12px"}}>
            <td class="pb-3 "  scope="row">Arizona</td>
            <td class="pb-3 " >Objects</td>
            <td class="pb-3 " >1,500</td>
            <td class="pb-3 " >Male</td>
        </tr>
        </tbody>
    </table>
</div>
  )
}

export default Table