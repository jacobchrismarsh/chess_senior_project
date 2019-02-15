import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import User from "./modules/ViewUser/User";
import SignIn from "./modules/SignIn/SignIn";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/users" component={User} />
          <Route path="/sign_in" component={SignIn} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
