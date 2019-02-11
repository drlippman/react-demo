import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import './QuestionNav.css';

class QuestionNav extends Component {

  questionClasses () {
    const questions = this.props.questions;
    var out = [];

    for (let i=0; i < questions.length; i++) {
      if (questions[i].status === 0) {
        //unattempted
        out.push({
          "class": "far fa-circle bluetext qstatusicon",
          "alt": "Unattempted"
        })
      } else if (!questions[i].hasOwnProperty('score')) {
        //attempted, but no score info
        out.push({
          "class": "fas fa-circle bluetext qstatusicon",
          "alt": "Attempted"
        })
      } else if (questions[i].score === 0) {
        //wrong
        out.push({
          "class": "fas fa-times-circle redtext qstatusicon",
          "alt": "Incorrect"
        })
      } else if (questions[i].score === questions[i].possible) {
        //full score
        out.push({
          "class": "fas fa-check-circle greentext qstatusicon",
          "alt": "Correct"
        })
      } else {
        //partial score
        out.push({
          "class": "fas fa-dot-circle orangetext qstatusicon",
          "alt": "Partially correct"
        })
      }
    }
    return out;
  }
  scoreDisplay () {
    const questions = this.props.questions;
    var out = [];
    for (let i=0; i < questions.length; i++) {
      if (!questions[i].hasOwnProperty('score')) {
        out.push('');
      } else {
        let str = questions[i].canreattempt ? '(':'[';
        str += questions[i].score + '/' + questions[i].possible;
        str += questions[i].canreattempt ? ')':']';
        out.push(str);
      }
    }
    return out;
  }

  render () {
    const qn = this.props.qn;
    const questions = this.props.questions;

    const questionClasses = this.questionClasses();
    const scoreDisplay = this.scoreDisplay();

    const questionList = questions.map((qdata,index) => { return (
      <li key={index}>
        <Link to={'/skip/'+index}>
          <i className={questionClasses[index].class}
            aria-label={questionClasses[index].alt}
            title={questionClasses[index].alt}
          ></i>
          { 'Question '+(index+1) }&nbsp;
          { scoreDisplay[index] }
          {qdata.canreattempt &&
            <i className="fa fa-undo redoicon"></i>
          }
        </Link>
      </li>
    )});

    return (
      <div className="dropdown">
        <div
           tabIndex="0"
           role="button"
           aria-haspopup="true"
           aria-expanded="false"
           aria-controls="question-nav"
           className="questionnav dropdown-toggle"
           data-toggle="dropdown"
         >
          <i className={questionClasses[qn].class}
            aria-label={questionClasses[qn].alt}
            title={questionClasses[qn].alt}
            ></i>
          Question { qn+1 }&nbsp;
          { scoreDisplay[qn] }
          <span className="redoicon">
            {questions[qn].canreattempt &&
              <i className="fa fa-undo"></i>
            }
          </span>
          <i className="fa fa-caret-down" style={{marginLeft: "10px"}}></i>
        </div>
        <ul className="dropdown-menu">
        {questionList}
        </ul>
      </div>
    )
  }
}

export default QuestionNav;
