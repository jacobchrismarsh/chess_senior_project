import React from "react";
import Countdown from "react-countdown-now"
import SweetAlert from "sweetalert2-react";
import "../clock.css"

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.clock = React.createRef();
  }

  componentWillUpdate() {
    let { move, turn } = this.props
    let clockApiInterface = this.clock.current.api;

    if ((this.state.playerColor === turn) && move !== 0) {
      clockApiInterface.start();
    } else {
      clockApiInterface.pause();
    }

  }

  render() {
    return (
      <Countdown 
        ref={this.clock}
        autoStart={false}
        daysInHours={true}
        date={this.props.time} />
    );
  }
}