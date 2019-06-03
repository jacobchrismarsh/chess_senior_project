import React, { Component } from "react";
import "../game.css";

export class RightSidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="game-information">
          <br />
          <div>Move Count: {this.props.count}</div>
          <br />
          <div>Turn: {this.props.turn}</div>
          <br />
          <div className={`error ${this.props.error === "" ? "" : "hidden"}`}>
            {this.props.error}
          </div>
        </div>
      </div>
    );
  }
}
