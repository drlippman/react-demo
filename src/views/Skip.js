import React, { Component } from 'react';
import AssessHeader from '../components/AssessHeader';
import SkipQuestionHeader from '../components/SkipQuestionHeader';
import Question from '../components/Question';
import './Skip.css';

class Skip extends Component {

  totalPointsPossible () {
    let pointsPossible = 0;
    for (let i in this.props.assessInfo.questions) {
      pointsPossible += this.props.assessInfo.questions[i].possible;
    }
    return 'Assessment is worth ' + pointsPossible + ' points';
  }

  render() {
    const qn = this.props.match.params.qn;
    var questionArray = [];
    for (var i=0;i < this.props.assessInfo.questions.length; i++) {
      questionArray.push((
        <div key={i} className={i == qn ? "" : "inactive"}>
          <Question
            qdata={this.props.assessInfo.questions[i]}
            qn={i}
            active={i == qn}
            loadQuestion={this.props.loadQuestion}
            submitQuestion={this.props.submitQuestion}
          ></Question>
        </div>
      ));
    }

    return (
      <div>
        <AssessHeader assessInfo={this.props.assessInfo}></AssessHeader>
        <SkipQuestionHeader qn={qn} questions={this.props.assessInfo.questions}></SkipQuestionHeader>
        <div className="scrollpane">
          <div className="questionpane">
            {questionArray}
          </div>
        </div>
      </div>
    );
  }
}

export default Skip;
