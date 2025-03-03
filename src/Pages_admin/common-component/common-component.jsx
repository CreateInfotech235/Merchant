import { useState } from "react";
import Navbar from "./nav";
import Subnavigation from "../subnavigation/subnavigation";
import SocialMedia from "./sosyalmedya";
const CommonComponent = () => {
  // List of components to be displayed in Subnavigation
  const listOfComponents = [
    {
      name: "Menu Settings",
      number: 1,
      component: <Navbar />,
    },
    {
      name: "Social Media Settings",
      number: 2,
      component: <SocialMedia />,
    },
    {
      name: "Footer Settings",
      number: 3,
      component: <div>Footer Component</div>,
    },
  ];

  return (
    <>
      <Subnavigation components={listOfComponents} defoltindex={0} />
    </>
  );
};

export default CommonComponent;
