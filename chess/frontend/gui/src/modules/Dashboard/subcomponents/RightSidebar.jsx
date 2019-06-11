import React, { Component } from "react";
import { WHITE, BLACK } from "../../Game/constants"
import Button from '@material-ui/core/Button';
import "../dashboard.css";


export class RightSidebar extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
  }

  handleButton(event) {
    window.location = `game/${event.target.id;}`;
  }

  componentDidMount() {
    // TODO fetch data from backend, using mock data until then
    this.setState({
      games: [
        {
          id: 0,
          color: WHITE,
          turn: WHITE,
          count: 13,
          opponent: 'Computer'
        },
        {
          id: 23,
          color: BLACK,
          turn: WHITE,
          count: 63,
          opponent: 'Online Opponent - 1234'
        },
        {
          id: 33,
          color: WHITE,
          turn: BLACK,
          count: 3,
          opponent: 'Online Opponent - 234'
        }
      ]
    });
  }

  renderGame(game, idx) {
    let {id, color, turn, count, opponent } = game;

    return (
      <div>
        <div>ID: {id}</div>
        <div>Color: {color}</div>
        <div>Turn: {turn}</div>
        <div>Count: {count}</div>
        <div>Opponent: {opponent}</div>
        <br/>
        <Button
            size="medium"
            variant="contained"
            color="primary"
            className="chess-button"
            onClick={this.handleButton}
          >
          <span id={id}>Join Game</span>
          </Button>
      </div>

    );

  }

  render() {
    return (
      <div className="sidebar-container">
        <div className="dashboard-right-sidebar-item">Current games</div>

        <div>
          {
            this.state.games.map((game, idx) => {
              return (
                <div
                  className="dashboard-right-sidebar-item"
                  key={idx}
                >
                  {this.renderGame(game, idx)}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}