import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import AppNavbar from './components/AppNavbar';
// import Profile from "./components/ChatProfile";
// import Sidepanel from "./components/ChatSidePanel";
// import AddChatModal from "./components/ChatPopup";
// import WebSocketInstance from "./websocket.js";
// import ChatApp from "./containers/ChatApp";

import * as actions from './store/actions/auth';
// import * as navActions from "./store/actions/nav";
// import * as messageActions from "./store/actions/message";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import './assets/ChatApp.css';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  // constructor(props) {
  //   super(props);
  //   WebSocketInstance.addCallbacks(
  //     this.props.setMessages.bind(this),
  //     this.props.addMessage.bind(this)
  //   );
  // }

  render() {
    return (
      <div>
        <Router>
          <AppNavbar {...this.props} />
          <BaseRouter />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // showAddChatPopup: state.nav.showAddChatPopup,
    authenticated: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
    // closeAddChatPopup: () => dispatch(navActions.closeAddChatPopup()),
    // addMessage: message => dispatch(messageActions.addMessage(message)),
    // setMessages: messages => dispatch(messageActions.setMessages(messages))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
