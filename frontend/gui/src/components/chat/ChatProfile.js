import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Hoc from '../../hoc/hoc';
import PropTypes from 'prop-types';


class Profile extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,

  };


  render() {

    const { isAuthenticated, user } = this.props.auth;

    if (this.props.token === null) {
      return <Redirect to="/" />;
    }
    return (
      <div className="contact-profile">
        {this.props.username !== null ? (
          <Hoc>
            <img
              src="https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png-8.png"
              alt=""
            />

            <p>
              <strong style={{ textTransform: "capitalize" }}>
                {user ? ` ${user.username}` : ""}
              </strong>
              {/* <small style={{ color: "#95a5a6" }}>
                To start, select the chatroom in the side panel, or start a new
                chatroom.
              </small> */}
            </p>
          </Hoc>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Profile);
