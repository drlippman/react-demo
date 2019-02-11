import React, { Component } from 'react';
import Timer from './Timer';
import ResourceMenu from './ResourceMenu';
import './AssessHeader.css';

class AssessHeader extends Component {
  curScore () {
    if (!this.props.assessInfo.showscores) {
      return '';
    }
    const questions = this.props.assessInfo.questions;
    let pointsPossible = 0;
    let pointsEarned = 0;
    for (let i in questions) {
      pointsPossible += questions[i].possible;
      pointsEarned += questions[i].score;
    }
    return 'Score: ' + pointsEarned + '/' + pointsPossible
  }
  curAnswered () {
    const questions = this.props.assessInfo.questions;
    let qAnswered = 0;
    let nQuestions = questions.length;
    for (let i in questions) {
      if (questions[i].status>0) {
        qAnswered++;
      }
    }
    return qAnswered + '/' + nQuestions + ' answered'
  }

  render() {
    const assessInfo = this.props.assessInfo;

    return (
      <div id="assess-header">
        <div style={{flexGrow: 1}}>
          <h1>{ assessInfo.name }</h1>
          <div>
            <span>{ this.curScore() }</span>
            <span className="answeredinfo">{ this.curAnswered() }</span>
          </div>
        </div>

        { assessInfo.timelimit > 0 &&
          <Timer
            total={assessInfo.timelimit}
          ></Timer>
        }

        <button>Submit Assessment</button>

        { assessInfo.resources.length > 0 &&
          <ResourceMenu resources={assessInfo.resources}></ResourceMenu>
        }

        <div>
          <i className="fas fa-print bigicon"></i>
        </div>
      </div>
    )
  }
}

export default AssessHeader;
