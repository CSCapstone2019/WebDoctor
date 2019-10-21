import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcaseMedical } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <FontAwesomeIcon
            icon={faBriefcaseMedical}
            style={{ color: 'white' }}
            className="fa-2x pr-2"
          />
          <NavbarBrand href="/">WebDoctor</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/patient/">Patients</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/appointments/">Appointments</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/chat/">Messages</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about-us/">About Us</NavLink>
              </NavItem>
              {this.props.isAuthenticated ? (
                <NavItem onClick={this.props.logout}>
                  <NavLink href="/">Logout</NavLink>
                </NavItem>
              ) : (
                <NavItem>
                  <NavLink href="/login/">Login</NavLink>
                </NavItem>
              )}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AppNavbar);
