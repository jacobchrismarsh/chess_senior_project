import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { checkSignedIn } from "./modules/Common/utils";
import SignIn from "./modules/SignIn/SignIn";
import Dashboard from "./modules/Dashboard/Dashboard";
import CreateUser from "./modules/CreateUser/CreateUser";
import Game from "./modules/Game/Game";
import Header from "./modules/Header/Header";
import Home from "./modules/Home/Home";
import autoBind from "react-autobind";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false
    }

    autoBind(this);
  }

  componentDidMount() {
    checkSignedIn().then(response => {
      this.setState({
        signedIn: true
      });
    });
  }
  
  render() {
    return (
      <div>
        {
          this.state.signedIn && (
            <Header />
          )
        }
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/sign_in" component={SignIn} />
            <Route path="/create_user" component={CreateUser} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/game" component={Game} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
