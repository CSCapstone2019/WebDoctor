import React from 'react';
import { Spin, Icon } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import * as navActions from '../../store/actions/nav';
import * as messageActions from '../../store/actions/message';
import Contact from './ChatContact';
import PropTypes from "prop-types";


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Sidepanel extends React.Component {
  state = {
    loginForm: true
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    getUserChats: PropTypes.func.isRequired,
  };

  waitForAuthDetails() {
    const component = this;
    setTimeout(function () {
      if (!(component.props.loading)) {
        component.props.getUserChats(component.props.auth.user.username);
        return;
      } else {
        console.log("waiting for authentication details...");
        this.waitForAuthDetails();
      }
    }, 100);
  }

  componentDidMount() {
    this.waitForAuthDetails();
  }

  // componentDidMount() {
  //   // const { user } = this.props.auth;
  //   // this.props.getUserChats(this.props.auth.user.username);
  //   this.props.getUserChats();
  // }

  openAddChatPopup() {
    this.props.addChat();
  }

  render() {
    const { user } = this.props.auth;
    
    let activeChats = this.props.chats.map(c => {
      return (
        <Contact
          key={c.chat_id}
          name={`${c.chat_id}`}
          picURL="http://emilcarlsson.se/assets/louislitt.png"
          status="busy"
          chatURL={`/chat/${c.chat_id}`}
          // chatURL={`/chat/1`}
        />
      );
    });

    console.log("CHATS ", activeChats);

    return (
      <div id="sidepanel">
        <div id="profile">
          <div className="wrap">
            <img
              id="profile-img"
              src="http://emilcarlsson.se/assets/mikeross.png"
              className="online"
              alt=""
            />
            <strong> {user ? ` ${user.username}` : ""} </strong>
            
            {/* <div id="status-options">
              <ul>
                <li id="status-online" className="active">
                  <span className="status-circle" /> <p>Online</p>
                </li>
                <li id="status-away">
                  <span className="status-circle" /> <p>Away</p>
                </li>
                <li id="status-busy">
                  <span className="status-circle" /> <p>Busy</p>
                </li>
                <li id="status-offline">
                  <span className="status-circle" /> <p>Offline</p>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
        <div id="contacts">
          <ul>{activeChats}</ul>
        </div>
        <div id="bottom-bar">
          <button id="addChat" onClick={() => this.openAddChatPopup()}>
            <i className="fa fa-user-plus fa-fw" aria-hidden="true" />
            <span>Create chat</span>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    loading: state.loading,
    chats: state.message.chats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChat: () => dispatch(navActions.openAddChatPopup()),
    getUserChats: (username) => dispatch(messageActions.getUserChats(username))
    // getUserChats: () => dispatch(messageActions.getUserChats())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidepanel);
