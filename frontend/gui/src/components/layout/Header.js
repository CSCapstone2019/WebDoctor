import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcaseMedical } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../store/actions/auth';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

class Header extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, isStaff, user } = this.props.auth;
    console.log('USER --------------', user);

    const authLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/patient/">Patients</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/appointments/">Appointments</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/reports/">Reports</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/chat/">Messages</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about-us/">About Us</NavLink>
        </NavItem>
        <NavItem className="pl-2">
          <Button onClick={this.props.logout} color="info" size="md">
            Logout
          </Button>
        </NavItem>
        <span className="navbar-text ml-3">
          <strong>Welcome </strong>
          <strong>{isStaff ? `Doctor ` : ''}</strong>
          <strong style={{ textTransform: 'capitalize' }}>
            {user ? ` ${user.username}` : ''}
          </strong>
        </span>
      </Nav>
    );

    const guestLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/about-us/">About Us</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/register/">Register</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login/">Login</NavLink>
        </NavItem>
      </Nav>
    );
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Container>
            <FontAwesomeIcon
              icon={faBriefcaseMedical}
              style={{ color: 'white' }}
              className="fa-2x pr-2"
            />
            <NavbarBrand href="/">WebDoctor</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
