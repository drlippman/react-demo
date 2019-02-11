import React, { Component } from 'react';
import './Question.css';

class Question extends Component {

  componentDidUpdate () {
    this.loadIfNeeded ()
  }
  componentDidMount () {
    this.loadIfNeeded ()
  }

  loadIfNeeded () {
    const questionContentLoaded = (this.props.qdata.html !== null);
    if (!questionContentLoaded && this.props.active) {
      this.props.loadQuestion(this.props.qn);
    }
    if (questionContentLoaded) {
      setTimeout(window.drawPics, 100);
      window.rendermathnode(document.getElementById("questionwrap" + this.qn));
    }
  }

  render () {
    const submitLabel = 'Submit';
    const questionContentLoaded = (this.props.qdata.html !== null);

    if (!questionContentLoaded) {
      return <div className="questionwrap"><p>Loading...</p></div>
    }
    return (
      <div className="questionwrap" id={'questionwrap'+this.props.qn}>
        <div
          dangerouslySetInnerHTML={{__html: this.props.qdata.html}}
          id={'questionwrap' + this.props.qn}
        ></div>
        {this.props.qdata.canreattempt &&
          <p><br/>
            <button onClick={()=>this.props.submitQuestion(this.props.qn)}>{ submitLabel }</button>
          </p>
        }
      </div>
    )
  }
}

export default Question;
