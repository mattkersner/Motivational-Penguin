import React, { Component } from 'react';
import Tweed from './Tweed';
import Input from './Input';
import TweedrFeed from './TweedrFeed';
import axios from 'axios';
import moment from 'moment';
import logo from './bird.gif';
import './App.css';



class App extends Component {

  constructor() {
    super();
    this.state = {
      tweeds: {}
    }
    this.addTweed = this.addTweed.bind(this);
    this.getTweeds = this.getTweeds.bind(this);
  }

  componentDidMount() {
    this.getTweeds();
  }
  //get call, gets data from firebase and sets tweeds state to tweed objects stored there
  getTweeds() {
    axios.get('https://tweedr-440cb.firebaseio.com/.json')
    .then((res) => {
      this.setState({
        tweeds: res.data
      })
    })
  }

  addTweed() {
    //don't want this to run if there are no tweeds
    if (this.state.tweeds) {
      console.log('addTweed method');
      //Object.keys over the tweeds objects to map over it
      let list = Object.keys(this.state.tweeds)
      //reverse the order of tweeds so newest ones show at the top
        .reverse()
        .map((key, i) => {
          //map over object, key will be unique code that is created in post request
          //return jsx Tweed component and pass it props needed
          return (
            <Tweed
              key={key}
              time={moment(this.state.tweeds[key].time).calendar()}
              //function to do get request and setState
              getTweeds={this.getTweeds}
              //unique axios post code, need to pass this down as a prop, win!
              uniquePostCode={key}
              tweeds={this.state.tweeds} />
          )
        })
      return list;
      }
    }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro"><b>Motivational Penguin Likes Your Style</b></p>
        <Input getTweeds={this.getTweeds} />
        <TweedrFeed addTweed={this.addTweed} />
      </div>
    );
  }
}


export default App;
