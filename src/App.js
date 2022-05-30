import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Classes from "./pages/classes";
import Manager from "./pages/manager";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route exact path="/manager" element={<Manager />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Fragment>
  );
}

export default App;
