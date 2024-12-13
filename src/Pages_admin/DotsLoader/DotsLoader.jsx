import React from "react";
import "./DotsLoader.css"; // Import the CSS file

const DotsLoader = ({ color = "#fff" }) => {
  return (
    <section className="dots-container ml-2">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="dot"
          style={{
            animationDelay: `${index * 0.2 - 0.3}s`,
            backgroundColor: color, // Use the color prop for background color
          }}
        ></div>
      ))}
    </section>
  );
};

export default DotsLoader;
