import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import User from "./modules/ViewUser/User";
import SignIn from "./modules/SignIn/SignIn";
import Dashboard from "./modules/Dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/users" component={User} />
          <Route path="/sign_in" component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
