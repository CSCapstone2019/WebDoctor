
import React, { Component } from 'react';
import Chat from '../components/Chat';
import WebSocketInstance from "../websocket.js";
import AppNavbar from '../components/AppNavbar';


class ChatApp extends Component {

  componentDidMount(){
    WebSocketInstance.connect();
  }

  render(){
    return(
      <>
        <AppNavbar />
        <Chat />
      </>
    )
  }
}

export default ChatApp;