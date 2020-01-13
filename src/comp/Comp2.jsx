import React from "react";
import logo from "../logo.svg";
import "./Comp.css";

function Comp2() {
  return (
    <div className="comp-con" style={{ backgroundColor: "#1a0020" }}>
      <img src={logo} className="comp-logo" alt="logo" style={{ height: "30vmin" }} />
      <p>这是第2个TAB</p>
      <a className="comp-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </div>
  );
}

export default Comp2;
