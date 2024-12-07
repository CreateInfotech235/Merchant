import React, { useState } from "react";
import { Link } from "react-router-dom";
import tickmark from '../../assets_admin/tickmark.png'

const OrderSetting = () => {
  // Sample data array
  const settings = [
    { type: "Type 1", oneSignal: true, firebaseAdmin: true },
    { type: "Type 2", oneSignal: true, firebaseAdmin: true },
    // Add more objects as needed
  ];

  return (
    <>
       <div className="table-responsive">
        <table
          class="table-borderless w-100 text-center bg-light"
          style={{ fontSize: "10px" }}
        >
          <thead class="text-light" style={{ background: "#253A71" }}>
            <tr>
            <th class="p-3">type</th>
            <th class="p-3">one signal</th>
            <th class="p-3">firebase(for admin)</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((setting, index) => (
              <tr key={index}>
                <td class="p-3">{setting.type}</td>
                <td class="p-3">
                  {setting.oneSignal && <img src={tickmark} alt="Tick" />}
                </td>
                <td class="p-3">
                  {setting.firebaseAdmin && <img src={tickmark} alt="Tick" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderSetting;
