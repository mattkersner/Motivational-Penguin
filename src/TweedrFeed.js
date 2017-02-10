import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class TweedrFeed extends React.Component {
  //only thing this needs is addTweed method to render the ul
  render() {
    const { addTweed } = this.props;
    return (
       <ul className="flexUl">
       <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
         {addTweed()}
       </ReactCSSTransitionGroup>
       </ul>
   )
  }
}

TweedrFeed.propTypes = {
  addTweed: React.PropTypes.func.isRequired
}

export default TweedrFeed;
