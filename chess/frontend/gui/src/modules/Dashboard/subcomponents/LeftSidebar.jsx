import React, { Component } from "react";
import RadioButtonGroup from '@material-ui/core/RadioGroup';
import RadioButton from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/lab/Slider';
import autoBind from 'react-autobind';

export class LeftSidebar extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      opponent: 'Computer'
    };

    autoBind(this);
  }

  handleRadioButtonChange(event, value) {
    this.setState({ 
      opponent: value 
    });
  }

  render() {

    let opponentOptions = ['Computer', 'Online Opponent'];

    return (
      <div className="left-sidebar-container">

        <div>Start a new game</div>

        <div>Who would you like to play against?</div>

        <div>
          <RadioButtonGroup
            value={this.state.opponent}
            onChange={this.handleRadioButtonChange}
            
          >

          {
            opponentOptions.map(choice =>
              <FormControlLabel value={choice} control={<RadioButton />} label={choice} />)
          }
          </RadioButtonGroup>
        </div>

        <div>
          <Slider />

        </div>
      </div>
    );
  }
}