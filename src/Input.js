import React from 'react';
import axios from 'axios';

class Input extends React.Component {
//post request, needs to be called when a new tweet is added and submit button is clicked
  createMessage() {
    axios({
      method: 'post',
      url: `https://tweedr-440cb.firebaseio.com/.json`,
      data: {
        content: this.tweed.value,
        time: new Date()
      }
    }).then(() => {
    this.props.getTweeds();
    this.tweed.value = "";
    });
  }

  keyPress(e) {
    if (e.charCode === 13) {
      this.createMessage();
    }
  }

  render() {
    return (
     <div>
       <input
         type="text"
         ref={(input) => this.tweed = input}
         onKeyPress={(e) => this.keyPress(e)}
         placeholder="What's on Your Mind?"
         className="focus"
         autoFocus="autofocus"/>
       <button
         type="submit"
         onClick={() => this.createMessage()}
         className="flat"
         id="button">
         Submit
       </button>
     </div>
   )
  }
}

Input.propTypes = {
  getTweeds: React.PropTypes.func.isRequired
}

export default Input;
