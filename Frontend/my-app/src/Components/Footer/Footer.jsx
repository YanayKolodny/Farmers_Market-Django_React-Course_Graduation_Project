import React from "react";

import { FaArrowUp } from "react-icons/fa";

// This component is the footer of the project.
// it is presented at all time at the buttom of the page.
export default function Footer() {
  const handelToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="footer">

      <span onClick={handelToTop} className="go_top">
        <FaArrowUp />
      </span>

      <span style={{ position: "relative", left: "3%" }}><p>The Farmers Market - Django & React project by Yanay Kolodny and Michael Stern</p></span>
      <span >
        <a href="https://github.com/YanayKolodny/Farmers_Market-Django_React-Course_Graduation_Project.git"
          target="_blank">

          Link To The Project's GitHub</a>
      </span>
    </div >
  );
}
