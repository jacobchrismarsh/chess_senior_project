import React from "react";
import "../clock.css"

export class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: props.seconds,
      minutes: props.minutes,
      playerColor: props.player
    }
  }

  renderTimeFormat() {
    let minutesString = this.state.minutes.toString().padStart(2, "0");
    let secondsString = this.state.seconds.toString().padStart(2, "0");
    return `${minutesString}:${secondsString}`
  }

  render() {
    return (
      <div className="clock">
        {this.renderTimeFormat()}
      </div>
    );
  }
}