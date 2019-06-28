import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    jokesNumberToGet: 10
  };

  state = {
    jokes: []
  };

  async componentDidMount() {
    const jokes = [];
    while (jokes.length < this.props.jokesNumberToGet) {
      const response = await axios.get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json"
        }
      });
      const { id, joke } = response.data;
      jokes.every(joke => joke.id !== id) && jokes.push({ id, text: joke, votes: 0 });
    }
    this.setState({
      jokes
    });
  }

  _changeVote = (id, delta) => {
    this.setState(({ jokes }) => ({
      jokes: jokes.map(joke =>
        joke.id === id ? { ...joke, votes: joke.votes + +delta } : joke
      )
    }));
  };

  upVote = (id) => {
    this._changeVote(id, 1);
  }

  downVote = (id) => {
    this._changeVote(id, -1);
  }

  render() {
    const jokes = this.state.jokes.map(joke => (
      <Joke key={joke.id} {...joke} upVote={this.upVote} downVote={this.downVote}/>
    ));

    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="Dad Jokes"
          />
          <button>New Jokes</button>
        </div>
        <div className="JokeList-jokes">{jokes}</div>
      </div>
    );
  }
}

export default JokeList;
