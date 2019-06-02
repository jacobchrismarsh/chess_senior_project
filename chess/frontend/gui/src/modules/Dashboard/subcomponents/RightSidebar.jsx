import React, { Component } from "react";
import { WHITE, BLACK } from "../../Game/constants"
import Button from '@material-ui/core/Button';
import "../dashboard.css";
import $ from 'jquery';


export class RightSidebar extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
  }

  handleButton(event) {
    let id = event.target.id;
    console.log(id)
  }

  componentDidMount() {
    return $.ajax({
      url: "http://127.0.0.1:8000/game/get_current_games/",
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('token')}`
      }
    }).then(response => {
      this.setState({
        games: response.games
      });
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