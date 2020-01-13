import React from "react";
import logo from "../logo.svg";
import "./Comp.css";

function Comp1() {
  return (
    <div className="comp-con">
      <img src={logo} className="comp-logo animation" alt="logo" />
      <p>这是第1个TAB</p>
    </div>
  );
}

export default Comp1;
