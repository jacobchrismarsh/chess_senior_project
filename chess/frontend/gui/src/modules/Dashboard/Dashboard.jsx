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
import "./dashboard.css";

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = { width: 0, height: 0 };
    autoBind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  getRandomNumberOfSamePolarity(num, len) {
    let res = Math.trunc(Math.random() * len);
    while (this.isEven(num) !== this.isEven(res)) {
      res = Math.trunc(Math.random() * len);
    }

    return res;
  }

  isEven(num) {
    if (num == 0) {
      return true;
    }
    return num % 2 === 0;
  }

  renderBoarder() {
    let pieces = [whitePawn, blackPawn, whiteBishop, blackBishop, whiteKnight, blackKnight, whiteRook,
                  blackRook, whiteQueen, blackQueen, whiteKing, blackKing];
    let { width } = this.state;
    let widthOfPiece = 50;

    let renderElements = [];
    let rand = Math.random() * (pieces.length);

    for (let i = 0; i < Math.floor(width / widthOfPiece); i++) {
      renderElements.push(<Square key={i} piece={pieces[this.getRandomNumberOfSamePolarity(i, pieces.length)]} />);
    }

    return (
      <div>
        {renderElements}
      </div>
    );
  }

  render() {
    
    return (
    <div>
      <div className="dashboard-boarder">
        {this.renderBoarder()}
      </div>
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
