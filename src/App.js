import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import Launch from './views/Launch';
import Skip from './views/Skip';
import $ from 'jquery';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessInfo: null,
    };
  }

  componentDidMount () {
    if (this.state.assessInfo === null) {
      $.ajax({
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
      $.ajax({
        url: '/data/getq' + qn + '.json',
        dataType: 'json'
      }).done((response) => {
        var newInfo = {...this.state.assessInfo};
        newInfo[qn] = response;
        this.setState({assessInfo: newInfo});
      })
    }
  }

  startAssess () {
    console.log("button clicked");
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
