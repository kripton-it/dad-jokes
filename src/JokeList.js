import React, { Component } from "react";
import axios from "axios";
import './JokeList.css';

class JokeList extends Component {
  static defaultProps = {
    jokesNumberToGet: 10,
  }

  state = {
    jokes: [],
  }

  async componentDidMount() {
    const jokes = [];
    while (jokes.length < this.props.jokesNumberToGet) {
      const response = await axios.get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json"
        }
      });
      jokes.push(response.data.joke);
    }
    this.setState({
      jokes,
    });
  }

  render() {
    const jokes = this.state.jokes.map(joke => (
      <div>{joke}</div>
    ));

    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
          <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="Dad Jokes"/>
          <button>New Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {jokes}
        </div>
      </div>
    );
  }
}

export default JokeList;
