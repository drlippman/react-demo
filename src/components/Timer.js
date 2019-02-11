import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {
  timerId: null;

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      timeString: "",
      expires: 0
    };
  }

  componentDidMount () {
    let now = new Date().getTime();
    this.setState({expires: now + 1000*60*this.props.total}, this.updateTimer);
    this.timerId = setInterval(this.updateTimer.bind(this), 1000);
  }

  updateTimer () {
    let now = new Date().getTime();
    let remaining = Math.max(0, this.state.expires - now);
    let hours = Math.floor(remaining / (1000 * 60 * 60));
    let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remaining % (1000 * 60 )) / (1000));
    let timeString = hours>0?hours+':' : '';
    timeString += (minutes<10?'0':'')+minutes + ':';
    timeString += (seconds<10?'0':'')+seconds;
    this.setState({timeString: timeString});
  }
  toggleShow () {
    this.setState({open: !this.state.open})
  }

  render() {
    return (
      <div id="timerbox" onClick={this.toggleShow.bind(this)} tabIndex="0">
        <i className="far fa-clock"></i>
        { this.state.open && (
          <span>{ this.state.timeString } &times;</span>
        ) }
      </div>
    )
  }
}

export default Timer;
