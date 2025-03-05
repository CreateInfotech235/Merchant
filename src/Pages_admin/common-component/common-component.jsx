import { useState } from "react";
import Navbar from "./nav";
import Subnavigation from "../subnavigation/subnavigation";
import SocialMedia from "./sosyalmedya";
import Footer from "./Footer";
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
      component: <Footer/>,
    },
  ];

  return (
    <>
      <Subnavigation components={listOfComponents} defoltindex={1} />
    </>
  );
};

export default CommonComponent;
