import React from "react";
import "../square.css";

function selected(selected) {
  return selected ? "selected" : "";
}

export function Square(props) {
  return (
    <button
      className={`${selected(props.selected)} square ` + props.squareColor}
      onClick={props.onClick}
    >
      <img src={props.piece} width="50" height="50" alt="" />
    </button>
  );
}
