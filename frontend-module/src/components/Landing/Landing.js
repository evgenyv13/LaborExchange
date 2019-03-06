import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem,} from 'reactstrap';
import './Landing.styles.css';
import '../Header/Header.styles.css';
import Link from "react-router-dom/es/Link";

class Landing extends Component {

    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Navbar expand="md" style={{backgroundColor: "#000", opacity: '0.7'}}>
                        <NavbarBrand href="/" style={{ color: "#fff"}}>
                            <div className={"navbar-brand-text"}>
                                LaborExchange
                            </div>
                        </NavbarBrand>

                        <NavbarToggler onClick={this.toggle}  style={{
                            backgroundColor: "Transparent",
                            backgroundRepeat: "no-repeat",
                            color: "#fff",
                            cursor: "pointer",
                            overflow: "hidden",
                            outline: "none",
                            border: "2px solid #fff",
                            borderRadius: "3px",
                            marginBottom: "4px"
                        }}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem style={{paddingTop: "8px"}}>
                                <span className="navlink-underline">
                                    <Link  to="/signin" className={"navlink whiteLink"}>SIGN IN</Link>
                                </span>
                                </NavItem>
                                <NavItem style={{paddingTop: "8px"}}>
                                <span className="navlink-underline">
                                    <Link  to="/signup" className={"navlink whiteLink"}>SIGN UP</Link>
                                </span>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
                <div className="landing-page">
                    <div className="landing-content">
                        <row>
                            <h1 className="boxed classH1">Have a good idea, but no team or investment?</h1>
                            <h1 className="boxed classH1">We have a solution!</h1>
                            <p className="boxed classP">Labor Echange</p>

                        </row>
                    </div>
                </div>
            </div>
        );
    }
};

export default withRouter(Landing);
