import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/users/")
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data });
      });
  }

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
      </div>
    );
  }
}

export default User;
