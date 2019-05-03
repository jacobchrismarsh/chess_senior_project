import React from "react";
import SweetAlert from "sweetalert2-react";
import "../clock.css"

export class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: props.seconds,
      minutes: props.minutes,
      playerColor: props.player,
      loseSwal: false
    }
  }

  componentWillReceiveProps() {
    this.startTimer();
  }

  renderTimeFormat() {
    let minutesString = this.state.minutes.toString().padStart(2, "0");
    let secondsString = this.state.seconds.toString().padStart(2, "0");
    return `${minutesString}:${secondsString}`
  }

  startTimer() {
    if (this.props.turn == this.state.playerColor && this.props.move != 0) {
      this.countDown();
    }
  }

  updateTime(minutes, seconds) {
    if (seconds == 0 && minutes > 0) {
      minutes--;
      seconds = 59
    }

    if (seconds == 0 && minutes == 0) {
      this.setState({
        loseSwal: true,
        playerColor: null,
        seconds: 0,
        minutes: 0
      });
    }

    seconds--

    return [minutes, seconds]
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    setInterval(
      () => {

        if (this.props.turn != this.state.playerColor) {
          return;
        }

        let updatedTime = this.updateTime(this.state.minutes, this.state.seconds);
        let updatedMinutes = updatedTime[0];
        let updatedSeconds = updatedTime[1];

        this.setState({
          seconds: updatedSeconds,
          minutes: updatedMinutes
        })
      },
      1000
    );
  }

  render() {
    return (
      <div className="clock">
        {this.renderTimeFormat()}
      <SweetAlert
        show={this.state.loseSwal}
        title="LOSER"
        text="You ran out of time!"
        />
      </div>
    );
  }
}