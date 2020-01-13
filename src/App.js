import React from "react";
import Comp1 from "./comp/Comp1.jsx";
import Comp2 from "./comp/Comp2.jsx";
import { BeeRouter, BeeRouterEmitter } from "./bee-router";

function clickHandler(item) {
  BeeRouter.push("/comp" + item);
}

function App() {
  BeeRouterEmitter.on("router-change", path => {
    console.log(path);
  });

  return (
    <div className="App">
      <div className="nav">
        <div onClick={clickHandler.bind(null, 1)}>导航1</div>
        <div onClick={clickHandler.bind(null, 2)}>导航2</div>
      </div>

      <div>
        <BeeRouter path="/comp1" component={Comp1} index="default" />
        <BeeRouter path="/comp2" component={Comp2} />
      </div>
    </div>
  );
}

export default App;
