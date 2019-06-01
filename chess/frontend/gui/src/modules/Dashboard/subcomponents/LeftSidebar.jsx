import React, { Component } from "react";
import RadioButtonGroup from '@material-ui/core/RadioGroup';
import RadioButton from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { Slider } from 'material-ui-slider';
import autoBind from 'react-autobind';
import TextField from '@material-ui/core/TextField';
import { WHITE, BLACK } from "../../Game/constants"
import $ from 'jquery';

import "../dashboard.css";

export class LeftSidebar extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      color: WHITE,
      opponent: 'Computer',
      opponentUsername: '',
      difficulty: 10
    };

    autoBind(this);
  }

  handleChangeRadioButton(component, event) {
    return e => {
      let value = e.target.value
      this.setState({
        [component]: value
      })
    }
  }

  handleChangeSlider(component, event) {
    return e => {
      this.setState({
        [component]: e
      });
    }
  }

  handleChangeText(component, event) {
    return e => {
      let value = e.target.value;
      this.setState({
        [component]: value
      });
    }
  }

  handleButton() {
    return $.ajax({
      url: "http://127.0.0.1:8000/game/create/",
      method: "GET",
      date: {
        opponent: this.state.opponent,
        difficulty: this.state.difficulty,
        color: this.state.color,
        opponentUsername: this.state.opponentUsername
      }
    });
  }

  render() {
    let colorOptions = [WHITE, BLACK]
    let opponentOptions = ['Computer', 'Online Opponent'];

    return (
      <div className="sidebar-container">

        <div className="dashboard-left-sidebar-item">
          Start a new game
        </div>

        <div className="dashboard-left-sidebar-item">
          <div>What color would you like to be?</div>
          <br/>
          <RadioButtonGroup
            value={this.state.color}
            onChange={this.handleChangeRadioButton('color')}
          >

          {
            colorOptions.map((choice, idx) =>
              <FormControlLabel
                key={idx}
                value={choice}
                control={<RadioButton />}
                label={choice}
              />)
          }
          </RadioButtonGroup>
        </div>

        <div className="dashboard-left-sidebar-item">
          <div>Who would you like to play against?</div>
          <br/>
          <RadioButtonGroup
            value={this.state.opponent}
            onChange={this.handleChangeRadioButton('opponent')}
            
          >

          {
            opponentOptions.map((choice, idx) =>
              <FormControlLabel
                key={idx}
                value={choice}
                control={<RadioButton />}
                label={choice}
              />)
          }
          </RadioButtonGroup>
        </div>
        {
          this.state.opponent === 'Computer' && (
            <div className="dashboard-left-sidebar-item slider-div">
              <div>Difficuly</div>
              <br/>
              <Slider
                onChange={this.handleChangeSlider('difficulty')}
                min={0}
                max={20}
                defaultValue={10}
                />
            </div>
          )
        }

        {
          this.state.opponent === 'Online Opponent' && (
            <div className="dashboard-left-sidebar-item dashboard-text-input">
            <div>Opponent Username</div>
            <br/>
            <TextField
              value={this.state.opponentUsername}
              onChange={this.handleChangeText('opponentUsername')}
            />
            </div>
          )
        }

        <div className="dashboard-left-sidebar-item">
          <Button
            size="large"
            variant="contained"
            color="primary"
            className="chess-button"
            onClick={this.handleButton}
          >
            Create Game
          </Button>
        </div>

      </div>
    );
  }
}