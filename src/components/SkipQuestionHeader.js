import React, { Component } from 'react';
import { Link, Redirect, withRouter } from "react-router-dom";
import './SkipQuestionHeader.css';
import QuestionNav from './QuestionNav'
import QuestionDetailsMenu from './QuestionDetailsMenu'

class SkipQuestionHeader extends Component {

  goToQ (qn) {
    this.props.history.push('/skip/'+qn)
  }

  render () {
    const qn = parseInt(this.props.qn);
    const questions = this.props.questions;
    const curQData = questions[qn];
    const hasParts = curQData.hasOwnProperty('parts');
    const hasCategory = curQData.hasOwnProperty('category');
    const showDetails = (hasParts || hasCategory);

    return (
      <div id="skip-question-header">
        <div style={{flexGrow: 1}} id="skip-question-select">
          <button
            onClick={()=>{this.goToQ(qn-1)}}
            type="button"
            disabled={qn < 1}
            className="secondarybtn"
            id="qprev"
          >
            <i className="fa fa-chevron-left" aria-label="Previous"></i>
          </button>


          <QuestionNav questions={questions} qn={qn} goToQ={this.goToQ}></QuestionNav>

          <button
            onClick={()=>{this.goToQ(qn+1)}}
            type="button"
            disabled={qn >= questions.length-1}
            className="secondarybtn"
            id="qnext"
          >
            <i className="fa fa-chevron-right" aria-label="Next"></i>
          </button>
        </div>
        <div>
          { curQData.canreattempt &&
            <span
              title={'Attempt ' + curQData.attempt + ' of ' + curQData.totattempts}
            >
              <i className="fa fa-undo"></i>
              { curQData.attempt }/{ curQData.totattempts}
            </span>
          }
          { curQData.canregen &&
            <span
              title={'Version ' + curQData.regen + ' of ' + curQData.totregens}
            >
              <i className="fa fa-retweet" aria-label="version"></i>
              { curQData.regen }/{ curQData.totregens}
            </span>
          }
        </div>
        { showDetails &&
          <QuestionDetailsMenu qn={qn} qInfo={curQData}></QuestionDetailsMenu>
        }
      </div>
    )
  }
}

export default withRouter(SkipQuestionHeader);
