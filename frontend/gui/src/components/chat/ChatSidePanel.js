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
  };


  componentDidMount() {
    let username = this.props.username;
    // const { user } = this.props.auth;
    // this.props.getUserChats(this.props.auth.user.username);
    this.props.getUserChats();
  }

  openAddChatPopup() {
    this.props.addChat();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let activeChats = this.props.chats.map(c => {
      return (
        <Contact
          key={c.id}
          name={`${c.id}`}
          picURL="http://emilcarlsson.se/assets/louislitt.png"
          status="busy"
          // chatURL={`/chat/${c.id}`}
          chatURL={`/chat/1`}
        />
      );
    });

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
            <strong> {user ? ` ${this.props.username}` : ""} </strong>
            <i
              className="fa fa-chevron-down expand-button"
              aria-hidden="true"
            />
            <div id="status-options">
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
            </div>
            <div id="expanded">
              {this.props.loading ? (
                <Spin indicator={antIcon} />
              ) : this.props.isAuthenticated ? (
                <button onClick={() => this.props.logout()} className="authBtn">
                  <span>Logout</span>
                </button>
              ) : (
                <div>
                  <form method="POST" onSubmit={this.authenticate}>
                    {this.state.loginForm ? (
                      <div>
                        <input
                          name="username"
                          type="text"
                          placeholder="username"
                        />
                        <input
                          name="password"
                          type="password"
                          placeholder="password"
                        />
                      </div>
                    ) : (
                      <div>
                        <input
                          name="username"
                          type="text"
                          placeholder="username"
                        />
                        <input name="email" type="email" placeholder="email" />
                        <input
                          name="password"
                          type="password"
                          placeholder="password"
                        />
                        <input
                          name="password2"
                          type="password"
                          placeholder="password confirm"
                        />
                      </div>
                    )}

                    <button type="submit">Authenticate</button>
                  </form>

                  <button onClick={this.changeForm}>Switch</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div id="search">
          <label htmlFor="">
            <i className="fa fa-search" aria-hidden="true" />
          </label>
          <input type="text" placeholder="Search Chats..." />
        </div>
        <div id="contacts">
          <ul>{activeChats}</ul>
        </div>
        <div id="bottom-bar">
          <button id="addChat" onClick={() => this.openAddChatPopup()}>
            <i className="fa fa-user-plus fa-fw" aria-hidden="true" />
            <span>Create chat</span>
          </button>
          <button id="settings">
            <i className="fa fa-cog fa-fw" aria-hidden="true" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    chats: state.message.chats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChat: () => dispatch(navActions.openAddChatPopup()),
    // getUserChats: username => dispatch(messageActions.getUserChats(username))
    getUserChats: () => dispatch(messageActions.getUserChats())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidepanel);
