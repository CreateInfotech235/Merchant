import React from 'react';
import add from "../../assets_mercchant/add.png";
import edit from "../../assets_mercchant/edit.png";
import deleteimg from "../../assets_mercchant/deleteimg.png";
import show from "../../assets_mercchant/show.png";
import profileImg from "../../assets_mercchant/profile1.svg"; // Assuming this is the correct path to your profile image
import { Link } from "react-router-dom";

const Offer = () => {

    const data = [
        {
        id: "1",
        title: "jay korat",
        status: "active"
    },
    {
        id: "1",
        title: "jay korat",
        status: "active"
    },
    {
        id: "1",
        title: "jay korat",
        status: "active"
    },
    {
        id: "1",
        title: "jay korat",
        status: "active"
    },
    {
        id: "1",
        title: "jay korat",
        status: "active"
    },
    {
        id: "1",
        title: "jay korat",
        status: "active"
    },
];

    return (
        <div class="table-responsive">
                 <table class="table-borderless  w-100 text-center bg-light ">
            <thead class="text-light" style={{background:"#253A71"}}>
                    <tr>
                    <th class="p-4 ">ID</th>
                    <th class="p-4 ">Title</th>
                    <th class="p-4 ">File</th>
                    <th class="p-4 ">Status</th>
                    <th class="p-4 ">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (

                        <tr key={item.id} >
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td><img src={profileImg} alt="Profile" class="p-2" /></td> {/* Replace with your actual image path */}
                            <td class="text-success fw-bold">{item.status}</td>
                            <td >
                                <div className="d-flex align-items-center justify-content-lg-center">
                                    <button className="edit-btn m-2">
                                        <img src={edit} alt="Edit" />
                                    </button>
                                    <button className="delete-btn">
                                        <img src={deleteimg} alt="Delete" />
                                    </button>
                                    <button className="show-btn m-2">
                                        <img src={show} alt="Show" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Offer;
