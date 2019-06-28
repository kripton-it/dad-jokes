import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./Joke.css";

class Joke extends Component {
  static defaultProps = {
    colors: [
      "#f44336",
      "#FF9800",
      "#FFC107",
      "#FFEB3B",
      "#CDDC39",
      "#8BC34A",
      "#4CAF50"
    ],
    emojiClasses: [
      "angry",
      "confused",
      "neutral_face",
      "slightly_smiling_face",
      "smiley",
      "laughing",
      "rolling_on_the_floor_laughing"
    ]
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleUpClick = () => {
    const { id, upVote } = this.props;
    upVote(id);
  };

  handleDownClick = () => {
    const { id, downVote } = this.props;
    downVote(id);
  };

  _getIndex = () => {
    const { votes } = this.props;
    if (votes < 0) return 0;
    return Math.floor(votes / 3) + 1;
  };

  getColor = () => {
    return this.props.colors[this._getIndex()];
  };

  getEmoji = () => {
    return this.props.emojiClasses[this._getIndex()];
  };
  /*getEmoji() {
    const {votes, emojiClasses} = this.props;
    if (this.props.votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.votes >= 12) {
      return "em em-laughing";
    } else if (this.props.votes >= 9) {
      return "em em-smiley";
    } else if (this.props.votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (this.props.votes >= 3) {
      return "em em-neutral_face";
    } else if (this.props.votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }*/

  render() {
    const { text, votes } = this.props;

    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <button className="Joke-button" onClick={this.handleUpClick}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <span className="Joke-votes" style={{ borderColor: this.getColor() }}>
            {votes}
          </span>
          <button className="Joke-button" onClick={this.handleDownClick}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div className="Joke-text">{text}</div>
        <div className="Joke-smiley">
          <i class={`em em-${this.getEmoji()}`} />
        </div>
      </div>
    );
  }
}

export default Joke;
