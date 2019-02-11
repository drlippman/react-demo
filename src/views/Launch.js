import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Launch extends Component {

  totalPointsPossible () {
    let pointsPossible = 0;
    for (let i in this.props.assessInfo.questions) {
      pointsPossible += this.props.assessInfo.questions[i].possible;
    }
    return 'Assessment is worth ' + pointsPossible + ' points';
  }

  render() {
    return (
      <div className="home">
        <h1>{ this.props.assessInfo.name }</h1>
        <div dangerouslySetInnerHTML={{__html:this.props.assessInfo.intro}}></div>
        <p>{this.totalPointsPossible()}</p>
        <p><Link to="/skip/0"><button>Begin</button></Link></p>
      </div>
    );
  }
}

export default Launch;
