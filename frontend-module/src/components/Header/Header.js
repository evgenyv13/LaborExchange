
import React, {Component} from 'react';
import {Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import './Header.styles.css';

class Header extends Component {
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
                <Navbar expand="md" style={{backgroundColor: "#000", opacity: '0.7'}}>
                    <NavbarBrand href="/" style={{ color: "#fff"}}>
                        <div className={"navbar-brand-text"}>
                            STARTUPS
                        </div>
                    </NavbarBrand>

                    <NavbarToggler onClick={this.toggle}  style={{
                        backgroundColor: "Transparent",
                        backgroundRepeat: "no-repeat",
                        color: "#fff",
                        cursor: "pointer",
                        overflow: "hidden",
                        outline: "none",
                        border: "none",
                        border: "2px solid #fff",
                        borderRadius: "3px",
                        marginBottom: "4px"
                    }}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem style={{paddingTop: "8px"}}>
                                <span className="navlink-underline">
                                    <Link  to="/account/my-projects" className={"navlink"}>MY PROJECTS</Link>
                                </span>
                            </NavItem>
                            <NavItem style={{paddingTop: "8px"}}>
                                <span className="navlink-underline">
                                    <Link  to="/account/participantes-projects" className={"navlink"}>PARTICIPANTES</Link>
                                </span>
                            </NavItem>
                            <NavItem style={{paddingTop: "8px"}}>
                                <span className="navlink-underline">
                                    <Link  to="/account/projects-catalog" className={"navlink"}>PROJECTS</Link>
                                </span>
                            </NavItem>
                            <NavItem style={{paddingTop: "8px"}}>
                                <span className="navlink-underline">
                                    <Link   to="/account/tasks-catalog" className={"navlink"}>JOBS</Link>
                                </span>
                            </NavItem>
                            <NavItem style={{paddingTop: "8px"}}>
                                <span className="navlink-underline">
                                    <Link  to="/account/my-page" className={"navlink"}>MY PAGE</Link>
                                </span>
                            </NavItem>
                            <NavItem style={{paddingTop: "8px"}}>
                                <button onClick={this.props.handleLogout} className={"logout-button"}>
                                    <span className="logout-text">
                                        LOG OUT
                                    </span>
                                </button>
                              
                            </NavItem>                        
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
};

export default withRouter(Header);
