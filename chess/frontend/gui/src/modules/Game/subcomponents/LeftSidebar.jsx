import React from "react";
import "../game.css";

export class LeftSidebar extends React.Component {
  renderCapturedWhitePieces() {
    const list = this.props.white.map((piece, index) => {
      return (
        <li key={index}>
          <img src={piece.svg} width="25" height="25" />
        </li>
      );
    });

    return <ul>{list}</ul>;
  }

  renderCapturedBlackPieces() {
    const list = this.props.black.map((piece, index) => {
      return (
        <li key={index}>
          <img src={piece.svg} width="25" height="25" />
        </li>
      );
    });

    return <ul>{list}</ul>;
  }

  render() {
    return (
      <div className="sidebar">
        <div className="left-sidebar-container">
          <div className="left-sidebar-item color-black">
            {this.renderCapturedWhitePieces()}
          </div>
          <div className="left-sidebar-item">
            {this.renderCapturedBlackPieces()}
          </div>
        </div>
      </div>
    );
  }
}
