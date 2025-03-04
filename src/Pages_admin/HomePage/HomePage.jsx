import { useState } from "react";
import Subnavigation from "../subnavigation/subnavigation";
import Fastlandingpage from "./Fastlandingpage";
const HomePage = () => {
  // List of components to be displayed in Subnavigation
  const listOfComponents = [
    {
      name: "Landing page Settings",
      number: 1,
      component: <Fastlandingpage />,
    },
  
  ];

  return (
    <>
      <Subnavigation components={listOfComponents} defoltindex={1} />
    </>
  );
};

export default HomePage;
