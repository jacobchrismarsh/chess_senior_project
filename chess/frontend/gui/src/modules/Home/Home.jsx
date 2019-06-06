import React, { Component } from "react";
import { Square } from "../Game/subcomponents/Square";
import whitePawn from "../../cburnett/wp.svg";
import Button from '@material-ui/core/Button';
import autoBind from 'react-autobind';

import "../Dashboard/dashboard.css";
import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  render() {
    return (
      <div className="home-container">
        <br/>
        <br/>
        <div className="home-item home-title">Online Chess</div>
        <div className="home-item"><Square piece={whitePawn} /></div>
        <br/>
        <div className="home-item home-button-container">
          <Button
            size="medium"
            variant="contained"
            color="primary"
            className="chess-button home-button-item"
            onClick={() => window.location = '/sign_in'}
            >
            Sign In
          </Button>
          <div></div>
          <div></div>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            className="chess-button home-button-item"
            onClick={() => window.location = '/create_user'}
          >
            Create Account
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;