import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import loginIcon from "./login_icon.png";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import autoBind from 'react-autobind';
import $ from 'jquery';

const styles = theme => ({
  red: {
    color: 'red'
  },
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    'background-color': '#07ade0',
    marginTop: theme.spacing.unit * 3
  }
});

class CreateUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: ''
    }

    autoBind(this);
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handleSignUp = (e, data) => {
    e.preventDefault();
    $.ajax({
      url: 'http://127.0.0.1:8000/user/users/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      error: () => {
        this.setState({
          error: 'Username has already been taken'
        });
      },
      data: JSON.stringify(data)
    }).then(response => {
      debugger;
      localStorage.setItem('token', response.token);
      window.location = '/dashboard'
    })
  };

  // localStorage.setItem('token', json.token);
  // window.location = '/dashboard'

  render() {

    let { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img src={loginIcon} alt="" width="75" height="50" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create User
          </Typography>

          <div className={classes.red}>
              {this.state.error}
            </div>

          <form id="sign-up-form" onSubmit={e => this.handleSignUp(e, this.state)}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
                value={this.state.username}
                onChange={this.handleChange}
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create Account
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

CreateUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateUser);
