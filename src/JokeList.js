import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import "./JokeList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaugh } from "@fortawesome/free-solid-svg-icons";

class JokeList extends Component {
  static defaultProps = {
    jokesNumberToGet: 10
  };

  state = {
    jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
    isLoading: false,
  };

  getJokes = async () => {
    const jokes = [...this.state.jokes];
    let count = 0;
    while (count < this.props.jokesNumberToGet) {
      const response = await axios.get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json"
        }
      });
      const { id, joke } = response.data;
      if (jokes.every(joke => joke.id !== id)) {
        jokes.push({ id, text: joke, votes: 0 });
        count++;
      }
    }
    return jokes;
  };

  fetchJokes = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const jokes = await this.getJokes();
      this.setState(() => ({
        jokes,
        isLoading: false,
      }), this.updateLocalStorage);
    });
  }

  async componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.fetchJokes();
    }
  }

  _changeVote = (id, delta) => {
    this.setState(({ jokes }) => ({
      jokes: jokes.map(joke =>
        joke.id === id ? { ...joke, votes: joke.votes + +delta } : joke
      )
    }), this.updateLocalStorage);
  };

  upVote = id => {
    this._changeVote(id, 1);
  };

  downVote = id => {
    this._changeVote(id, -1);
  };

  handleNewJokesClick = async () => {
    this.fetchJokes();
  };

  updateLocalStorage = () => {
    window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
  }

  render() {
    if (this.state.isLoading) {
      return <div className="JokeList-spinner">
        <FontAwesomeIcon icon={faLaugh} spin size="8x" />
        <h1 className="JokeList-spinner-text">Wait for a moment...</h1>
      </div>
    }
    const jokes = this.state.jokes.map(joke => (
      <Joke
        key={joke.id}
        {...joke}
        upVote={this.upVote}
        downVote={this.downVote}
      />
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
          <button className="JokeList-add" onClick={this.handleNewJokesClick}>New Jokes</button>
        </div>
        <div className="JokeList-jokes">{jokes}</div>
      </div>
    );
  }
}

export default JokeList;
