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
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
            <strong>{user ? `${user.username}` : ''}</strong>
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
