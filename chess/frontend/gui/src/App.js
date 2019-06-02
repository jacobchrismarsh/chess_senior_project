import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import SignIn from "./modules/SignIn/SignIn";
import Dashboard from "./modules/Dashboard/Dashboard";
import CreateUser from "./modules/CreateUser/CreateUser";
import Game from "./modules/Game/Game";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/sign_in" component={SignIn} />
          <Route path="/create_user" component={CreateUser} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/game" component={Game} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
