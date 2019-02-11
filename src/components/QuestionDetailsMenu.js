import React, { Component } from 'react';
import './QuestionDetailsMenu.css';

class QuestionDetailsMenu extends Component {

  render () {
    const qInfo = this.props.qInfo;
    const showScore = qInfo.hasOwnProperty('score');
    const hasParts = qInfo.hasOwnProperty('parts');
    const hasCategory = qInfo.hasOwnProperty('category');
    var partRows = [];

    if (hasParts) {
      partRows = qInfo.parts.map((part,index) => { return (
        <tr key={index}>
          <td>{ index + 1 }</td>
          {showScore && <td>{ part.score }/{ part.possible }</td>}
          <td>{ part.attempt }/{ part.totattempts }</td>
        </tr>
      )});
    }

    return (
      <div className="dropdown">
       <div
          tabIndex="0"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="qdetails-menu"
          className="dropdown-toggle"
          data-toggle="dropdown"
        >
          <i className="fa fa-info-circle bigicon"></i>
          Details
        </div>
        <div id="qdetails-menu" role="menu" className="dropdown-menu dropdown-menu-right">
          <p className="menu-header"><strong>Question Details</strong></p>

          {hasParts &&
            <table className="qdetails">
              <thead>
                <tr>
                  <th>Part</th>
                  {showScore && <th>Score</th>}
                  <th>Attempt</th>
                </tr>
              </thead>
              <tbody>
                {partRows}
              </tbody>
            </table>
          }

          {hasCategory &&
            <p>
              <strong>Category:</strong>
              { qInfo.category }
            </p>
          }
        </div>
      </div>
    )
  }
}

export default QuestionDetailsMenu;
