import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import User from "./modules/ViewUser/User";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/users" component={User} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
