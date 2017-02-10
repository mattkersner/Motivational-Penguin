import React from 'react';
import axios from 'axios';


class Tweed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
  }

  handleDelete(key) {
    axios.delete(`https://tweedr-440cb.firebaseio.com/${key}.json`)
    .then((res) => {
      this.props.getTweeds();
    })
  }

  handleEdit(key) {
    this.setState({edit: !this.state.edit})
    axios.patch(`https://tweedr-440cb.firebaseio.com/${key}.json`, {
      content: this.textArea.value,
      time: new Date()
    })
    .then((res) => {
      this.props.getTweeds();
    })
  }

  keyPress(e) {
    if (e.charCode === 13) {
      this.handleEdit(this.props.uniquePostCode);
    }
  }

  updateRender() {
    const { tweeds } = this.props;
    return (
      <div className="updateRender">
        <textarea
          ref={(text) => this.textArea = text}
          defaultValue={tweeds[this.props.uniquePostCode].content}
          onKeyPress={(e) => this.keyPress(e)}
          autoFocus="autofocus" />
        <div className="cancel">
        <button
          type="submit"
          onClick={() => this.handleEdit(this.props.uniquePostCode)}
          className="flat">
          Submit
        </button>
        <button
          type="submit"
          onClick={() => this.setState({edit: !this.state.edit})}
          className="flat">
          Cancel
        </button>
        </div>
      </div>
    )
  }

  normalRender() {
    const { tweeds } = this.props;
    return (
     <li className="flexLi">
        <p>{tweeds[this.props.uniquePostCode].content}</p>
        <div className="buttons">
        <button type="submit" onClick={() => this.setState({edit: !this.state.edit})} className="flat">Edit</button>
        <button type="submit" onClick={() => this.handleDelete(this.props.uniquePostCode)} className="flat">Delete</button>
        </div>
      </li>
    )
  }

  render() {
    if (!this.state.edit) {
      return (this.normalRender());
    } else {
      return (this.updateRender());
    }
  }
}

Tweed.propTypes = {
  getTweeds: React.PropTypes.func.isRequired,
  uniquePostCode: React.PropTypes.string.isRequired,
  tweeds: React.PropTypes.object.isRequired,
  time: React.PropTypes.string.isRequired
}

export default Tweed;



// <span className="time">at {this.props.time}</span>
