import React, { Component } from 'react';
import {
  MDBCollapse,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  NavLink
} from 'mdbreact';
import { withRouter } from 'react-router-dom';
import './Header.styles.css';

class Header extends Component {
  state = {
    activeItem: 'my-page',
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <MDBNavbar className="header-style" dark expand="md">
          <MDBNavbarBrand
            onClick={this.props.handleClickOnSiteName}
            style={{ cursor: 'pointer' }}
          >
            STARTUPS
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem active={this.state.activeItem === 'my-projects'}>
                <NavLink
                  to="/account/my-projects"
                  className="white-text header-padding"
                >
                  MY PROJECTS
                </NavLink>
              </MDBNavItem>
              <MDBNavItem active={this.state.activeItem === 'participantes'}>
                <NavLink
                  to="/account/participantes-projects"
                  className="white-text"
                >
                  PARTICIPANTES
                </NavLink>
              </MDBNavItem>
              <MDBNavItem active={this.state.activeItem === 'projects'}>
                <NavLink
                  to="/account/projects-catalog"
                  className="white-text header-padding"
                >
                  PROJECTS
                </NavLink>
              </MDBNavItem>
              <MDBNavItem active={this.state.activeItem === 'tasks'}>
                <NavLink
                  to="/account/tasks-catalog"
                  className="white-text header-padding"
                >
                  JOBS
                </NavLink>
              </MDBNavItem>
              <MDBNavItem active={this.state.activeItem === 'my-page'}>
                <NavLink
                  to="/account/my-page"
                  className="white-text header-padding"
                >
                  MY PAGE
                </NavLink>
              </MDBNavItem>
              <MDBNavItem>
                <NavLink
                  to="/"
                  onClick={this.props.handleLogout}
                  className="white-text"
                >
                  LOG OUT
                </NavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </div>
    );
  }
}

export default withRouter(Header);
