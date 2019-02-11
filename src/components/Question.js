import React, { Component } from 'react';
import './Question.css';

class Question extends Component {

  render () {
    return (
      <p>Question {this.props.qn+1}</p>
    )
  }
}

export default Question;
