import React from "react";
import {MDBCollapse, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBNavItem, MDBNavLink} from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

class LandingHeader extends React.PureComponent {
    state = {
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
                    <MDBNavbarBrand href="/">
                            STARTUPS
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav right className="">
                            <MDBNavItem>
                                <MDBNavLink to="/signin" className="white-text ">SIGN IN</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active>
                                <MDBNavLink to="/signup" className="white-text">SIGN UP</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </div>
        )
    }

}

export default LandingHeader;