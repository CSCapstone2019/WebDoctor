
import React, { Component } from 'react';
import Chat from '../components/Chat';
import WebSocketInstance from '../websocket.js';
import Profile from '../components/ChatProfile';
import Sidepanel from '../components/ChatSidePanel';
import AddChatModal from "../components/ChatPopup";
import BaseRouter from '../routes';


class ChatApp extends Component {
  componentDidMount() {
    WebSocketInstance.connect();
  }

  render() {
    return (
      <>
        {/* <Chat /> */}
        <div id="frame">
          <Sidepanel {...this.props} />
          <div className="content">
            <AddChatModal
              isVisible={this.props.showAddChatPopup}
              close={() => this.props.closeAddChatPopup()}
            />
            <Profile />
            <BaseRouter /> 
          </div>
        </div>
      </>
    );
  }
}

export default ChatApp;