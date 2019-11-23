import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidepanel from '../components/chat/ChatSidePanel';
import Profile from '../components/chat/ChatProfile';
import AddChatModal from '../components/chat/ChatPopup';
import * as navActions from '../store/actions/nav';
import * as messageActions from '../store/actions/message';
import WebSocketInstance from '../websocket';
import PropTypes from 'prop-types';
import Chat from '../components/chat/Chat';
import BaseRouter from '../routes';
import Hoc from '../hoc/hoc';



class ChatApp extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    WebSocketInstance.addCallbacks(
      this.props.setMessages.bind(this),
      this.props.addMessage.bind(this)
    );
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Hoc>
      <Router>
        <div id="frame">
          <Sidepanel />
          <div className="content">
            <AddChatModal
              isVisible={this.props.showAddChatPopup}
              close={() => this.props.closeAddChatPopup()}
            />
            <Profile />
          </div>
        </div>
      </Router>
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    showAddChatPopup: state.nav.showAddChatPopup,
    auth: state.auth  
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeAddChatPopup: () => dispatch(navActions.closeAddChatPopup()),
    addMessage: message => dispatch(messageActions.addMessage(message)),
    setMessages: messages => dispatch(messageActions.setMessages(messages))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);
