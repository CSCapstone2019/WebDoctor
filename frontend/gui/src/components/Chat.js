import React from "react";
import "../assets/ChatApp.css";
import SidePanel from "./ChatSidePanel";
import WebSocketInstance from "../websocket.js";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
      WebSocketInstance.fetchMessages(this.props.currentUser);
    });
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(
      function () {
        if (WebSocketInstance.state() === 1) {
          console.log("Connection is made")
          callback();
          return;
        } else {
          console.log("wait for connection...")
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

  messageChangeHandler = (event) => {
    this.setState({
      message: event.target.value
    })
  }

  sendMessageHandler = (e) => {
    e.preventDefault();
    const messageObject = {
      from: "admin",
      content: this.state.message,
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({
      message: ''
    });
  }

  renderMessages = (messages) => {
    const currentUser = "admin";
    return messages.map((message, i) => (
      <li
        key={message.id}
        className={message.author === currentUser ? 'sent' : 'replies'}>
        <img src="https://s3-us-west-2.amazonaws.com/snap-sale/20180324200210/no-avatar.png" />
        <p>{message.content}
          <br />
          <small className={message.author === currentUser ? 'sent' : 'replies'}>
            {Math.round((new Date().getTime() - new Date(message.timestamp).getTime()) / 60000)} minutes ago
                    </small>
        </p>
      </li>
    ));
  }

  render() {
    const messages = this.state.messages;
    return (
      <div id="frame">
        <SidePanel />
        <div className="content">
          <div className="contact-profile">
            <img src="https://s3-us-west-2.amazonaws.com/snap-sale/20180324200210/no-avatar.png" alt="" />
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
                  placeholder="Write your message..." />
                <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                <button id="chat-message-submit" className="submit">
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

export default Chat; 