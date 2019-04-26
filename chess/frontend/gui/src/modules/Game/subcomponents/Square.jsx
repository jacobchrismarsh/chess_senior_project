import React from "react";
import "../square.css";

function selected(selected) {
  return selected ? "selected" : "";
}

function movable(moveable) {
  return moveable ? "movable" : "";
}

export function Square(props) {
  return (
    <button
      className={`${selected(props.selected)} ${movable(props.movable)} square ` + props.squareColor}
      onClick={props.onClick}
    >
      <img src={props.piece} />
    </button>
  );
}
