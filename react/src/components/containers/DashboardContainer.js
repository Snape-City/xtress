import React, {Component} from "react";
import {hot} from "react-hot-loader";
import Dashbox from "../presentational/dashbox.js";

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
  };


  render() {
    return ( 
    <div id="dashboard-wrapper">
      <Dashbox id="types" />
      <Dashbox id="average" />
      <Dashbox id="average" />
      <Dashbox id="average" />
      <Dashbox id="average" />


    </div>
    );
  }


}
export default hot(module)(DashboardContainer);