import React, { Component } from "react";
import autoBind from 'react-autobind';
import { LeftSidebar, RightSidebar } from "./subcomponents";
import { checkSignedIn } from '../Common/utils';
import "./dashboard.css";

class Dashboard extends Component {

  constructor(props) {
    super(props);

    autoBind(this);
  }
  
  componentDidMount() {
    checkSignedIn().then(
      response => {
        if (!response.status) {
          window.location ='/sign_in/'
        }
    });
  }


  render() {
    
    return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <LeftSidebar />
        </div>
        <div className="dashboard-sidebar">
          <RightSidebar />
        </div>
      </div>
    </div>
    );
  }
}

export default Dashboard;
