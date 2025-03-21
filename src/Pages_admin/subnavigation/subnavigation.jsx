import { useState } from "react";

const Subnavigation = ({ components, defoltindex = 1 }) => {
  
  const [activeComponent, setActiveComponent] = useState(components.find(i => i.number === defoltindex)?.component);
  const [activeNumber, setActiveNumber] = useState(components.find(i => i.number === defoltindex)?.number);

  return (
    <div className="w-full pt-4">
      {/* Button List */}
      <div className="flex space-x-4 mb-4">
        {components.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveComponent(item.component);
              setActiveNumber(item.number);
            }}
            className={`px-4 py-2 bg-[white] text-black rounded shadow-md hover:bg-[#ffd8bd] ${Number(activeNumber)  == Number(item.number)  ? 'bg-[#ffbc8b]' : ''}`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Display Active Component */}
      <div>
        {activeComponent}
      </div>
    </div>
  );
};

export default Subnavigation;
