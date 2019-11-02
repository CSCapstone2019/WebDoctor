
import React, { Component } from 'react';
import Chat from '../components/Chat';
import WebSocketInstance from '../websocket.js';

class ChatApp extends Component {
  componentDidMount() {
    WebSocketInstance.connect();
  }

  render() {
    return (
      <>
        <Chat />
      </>
    );
  }
}

export default ChatApp;