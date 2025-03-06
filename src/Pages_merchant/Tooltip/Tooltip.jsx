import { useState } from "react";

const Tooltip = ({ text, children, transform="translateX(-50%)" }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-50 left-1/2 transform  bottom-full mb-2 w-max max-w-xs px-3 py-1 text-white text-sm bg-gray-900 rounded-lg shadow-lg" 
        style={{
          transform: transform,
        }}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
