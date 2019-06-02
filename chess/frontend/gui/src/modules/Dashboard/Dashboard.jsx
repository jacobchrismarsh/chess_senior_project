import React, { Component } from "react";
import autoBind from 'react-autobind';
import whiteKing from "../../cburnett/wk.svg";
import blackKing from "../../cburnett/bk.svg";
import blackQueen from "../../cburnett/bq.svg";
import whiteQueen from "../../cburnett/wq.svg";
import blackRook from "../../cburnett/br.svg";
import whiteRook from "../../cburnett/wr.svg";
import blackKnight from "../../cburnett/bn.svg";
import whiteKnight from "../../cburnett/wn.svg";
import blackBishop from "../../cburnett/bb.svg";
import whiteBishop from "../../cburnett/wb.svg";
import whitePawn from "../../cburnett/wp.svg";
import blackPawn from "../../cburnett/bp.svg";
import { Square } from "../Game/subcomponents/Square";
import { LeftSidebar, RightSidebar } from "./subcomponents";
import { checkSignedIn } from '../Common/utils';
import $ from 'jquery';
import "./dashboard.css";

class Dashboard extends Component {

  constructor(props) {
    super(props);

    autoBind(this);
  }
  
  componentDidMount() {
    checkSignedIn().then(
      response => {
        debugger;
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
