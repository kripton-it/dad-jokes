import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleUpClick = () => {
    const {id, upVote} = this.props;
    upVote(id);
  }

  handleDownClick = () => {
    const {id, downVote} = this.props;
    downVote(id);
  }

  render() {
    const {text, votes}= this.props;

    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <button className="Joke-button" onClick={this.handleUpClick}><FontAwesomeIcon icon={faArrowUp}/></button>
          <span>{votes}</span>
          <button className="Joke-button" onClick={this.handleDownClick}><FontAwesomeIcon icon={faArrowDown}/></button>
        </div>
        <div className="Joke-text">{text}</div>
      </div>
    );
  }
}

export default Joke;
