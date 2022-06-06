import React, { Fragment } from "react";
import InputInformation from "../components/InputInformation";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <Fragment>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <InputInformation />
      </div>
    </Fragment>
  );
};
export default Home;
