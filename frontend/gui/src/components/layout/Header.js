import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcaseMedical } from '@fortawesome/free-solid-svg-icons';
import {
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

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
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
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/patient/">Patients</NavLink>
                </NavItem>
                {/* <NavItem>
                <NavLink href=""></NavLink>
              </NavItem> */}
                <NavItem>
                  <NavLink href="/appointments/">Appointments</NavLink>
                </NavItem>
                {/* <NavItem>
                <NavLink href=""></NavLink>
              </NavItem> */}
                <NavItem>
                  <NavLink href="/chat/">Messages</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/about-us/">About Us</NavLink>
                </NavItem>
                {/* <NavItem onClick={this.props.logout}>
                <NavLink href="/">Logout</NavLink>
              </NavItem> */}
                <NavItem>
                  <NavLink href="/register/">Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/login/">Login</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
