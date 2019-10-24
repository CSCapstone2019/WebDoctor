import React from 'react';
import '../assets/ChatApp.css';
import SidePanel from './ChatSidePanel';
import WebSocketInstance from '../websocket.js';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks(
        this.setMessages.bind(this),
        this.addMessage.bind(this)
      );
      WebSocketInstance.fetchMessages(this.props.currentUser);
    });
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function() {
      if (WebSocketInstance.state() === 1) {
        console.log('Connection is made');
        callback();
        return;
      } else {
        console.log('wait for connection...');
        component.waitForSocketConnection(callback);
      }
    }, 100);
  }

  addMessage(message) {
    this.setState({ messages: [...this.state.messages, message] });
  }

  setMessages(messages) {
    this.setState({ messages: messages.reverse() });
  }

  messageChangeHandler = event => {
    this.setState({
      message: event.target.value
    });
  };

  sendMessageHandler = e => {
    e.preventDefault();
    const messageObject = {
      from: 'admin',
      content: this.state.message
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({
      message: ''
    });
  };

  renderTimestamp = timestamp => {
    let prefix = "";
    const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime()) / 60000);
      if (timeDiff < 1) { // less than one minute ago
        prefix = 'just now...';
      } else if (timeDiff < 60 && timeDiff > 1) { // less than sixty minutes ago
        prefix = `${timeDiff} minutes ago`;
      } else if (timeDiff < 24 * 60 && timeDiff > 60) { // less than 24 hours ago
        prefix = `${Math.round(timeDiff / 60)} hours ago`;
      } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) { // less than 7 days ago
        prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
      } else {
        prefix = `${new Date(timestamp)}`;
      }
      return prefix
  }

  renderMessages = messages => {
    const currentUser = 'admin';
    return messages.map((message, i) => (
      <li
        key={message.id}
        className={message.author === currentUser ? 'sent' : 'replies'}
      >
        <img src="https://s3-us-west-2.amazonaws.com/snap-sale/20180324200210/no-avatar.png" />
        <p>
          {message.content}
          <br />
          <small>
            {this.renderTimestamp(message.timestamp)}
          </small>
        </p>
      </li>
    ));
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const messages = this.state.messages;
    return (
      <div id="frame">
        <SidePanel />
        <div className="content">
          <div className="contact-profile">
            <img
              src="https://s3-us-west-2.amazonaws.com/snap-sale/20180324200210/no-avatar.png"
              alt=""
            />
            <p>username</p>
            <div className="social-media">
              <i className="fa fa-facebook" aria-hidden="true"></i>
              <i className="fa fa-twitter" aria-hidden="true"></i>
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </div>
          </div>
          <div className="messages">
            <ul id="chat-log">
            {
              messages && 
              this.renderMessages(messages)
            }
            <div style={{ float: "left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}>
            </div>
            </ul>
          </div>
          <div className="message-input">
            <form onSubmit={this.sendMessageHandler}>
              <div className="wrap">
                <input
                  onChange={this.messageChangeHandler}
                  value={this.state.message}
                  required
                  id="chat-message-input"
                  type="text"
                  placeholder="Write your message..."
                />
                <i
                  className="fa fa-paperclip attachment"
                  aria-hidden="true"
                ></i>
                <button id="chat-message-submit" className="submit">
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
