import React, { useState } from "react";
import tickImage from "../../assets_admin/tick.png"; // Import the tick image

const NotificationSetting = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showModel, setShowModel] = useState(false);

  const closeModel = () => setShowModel(false);

  // Sample data for deliverymen
  const deliverymen = [
    {
    
        type: "active",
      sms: true,
      email: true,
      notification: true
    },
    {
    
        type: "active",
      sms: true,
      email: true,
      notification: true
    },
    {
    
        type: "active",
      sms: true,
      email: true,
      notification: true
    },
    {
    
        type: "active",
      sms: true,
      email: true,
      notification: true
    },
    {
    
        type: "active",
      sms: true,
      email: true,
      notification: true
    },
    {
    
        type: "active",
      sms: true,
      email: true,
      notification: true
    },
    // Add more deliverymen data as needed
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = deliverymen.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(deliverymen.length / itemsPerPage);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? "active" : null}
      >
        {number}
      </li>
    ));
  };

  return (
    <div className="fluid-container">
      <div className="table-responsive">
        <table className="table table-borderless w-100 text-center bg-light" >
          <thead className="text-light" style={{ background: "#253A71" }}>
            <tr>
              <th className="p-3 text-white" style={{ background: "#253A71" }} >type</th>
              <th className="p-3 text-white"  style={{ background: "#253A71" }}>SMS</th>
              <th className="p-3 text-white"  style={{ background: "#253A71" }}>Email</th>
              <th className="p-3 text-white" style={{ background: "#253A71" }}>Notification</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((deliveryman) => (
              <tr key={deliveryman.id}>
               
                <td className="p-3">{deliveryman.type}</td>
                <td className="p-3">{deliveryman.sms ? <img src={tickImage} alt="tick" /> : ""}</td> {/* Use the tick image if SMS is true */}
                <td className="p-3">{deliveryman.email ? <img src={tickImage} alt="tick" /> : ""}</td> {/* Use the tick image if Email is true */}
                <td className="p-3">{deliveryman.notification ? <img src={tickImage} alt="tick" /> : ""}</td> {/* Use the tick image if Notification is true */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container d-flex justify-content-end mt-3">
        <ul className="pagination">{renderPageNumbers()}</ul>
      </div>
    </div>
  );
};

export default NotificationSetting;
