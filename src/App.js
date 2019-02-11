import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import Launch from './views/Launch';
import Skip from './views/Skip';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessInfo: null,
    };
    this.loadQuestion = this.loadQuestion.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
  }

  componentDidMount () {
    if (this.state.assessInfo === null) {
      window.$.ajax({
        url: '/data/assessdata.json', //adjust for path
        dataType: 'json'
      }).done((response) => {
        this.setState({assessInfo: response})
      }).fail((response) => {
        console.log("failed to laod assessment data")
      })
    }
  }

  loadQuestion (qn) {
    if (this.state.assessInfo.questions[qn].html === null) {
      window.$.ajax({
        url: '/data/getq' + qn + '.json',
        dataType: 'json'
      }).done((response) => {
        var newInfo = {...this.state.assessInfo};
        for (let i in response) {
          newInfo.questions[qn][i] = response[i];
        }
        this.setState({assessInfo: newInfo});
      })
    }
  }

  submitQuestion (qn) {
    window.$.ajax({
      url: '/data/scoreq' + qn + '.json',
      dataType: 'json'
    }).done((response) => {
      var newInfo = {...this.state.assessInfo};
      for (let i in response) {
        newInfo.questions[qn][i] = response[i];
      }
      this.setState({assessInfo: newInfo});
    })
  }

  render() {
    var assessInfoLoaded = (this.state.assessInfo !== null);

    if (!assessInfoLoaded) {
      return (
        <div className="app">Loading...</div>
      )
    } else {
      return (
        <Router>
          <Switch>
            <Route
              path="/skip/:qn"
              render={(props) =>
                <Skip {...props}
                  assessInfo={this.state.assessInfo}
                  loadQuestion={this.loadQuestion}
                  submitQuestion={this.submitQuestion}
                />
              }
            />
            <Route
              render={(props) =>
                <Launch {...props} assessInfo={this.state.assessInfo} />
              }
            />
          </Switch>
        </Router>
      );
    }
  }
}

export default App;
