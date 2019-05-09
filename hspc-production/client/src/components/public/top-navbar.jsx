import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../_common/assets/css/public-navbar.css';

/*
* Creates and renders the navbar. This is viewable across all views.
* @author: Daniel Bell
*/
export default class TopNavbar extends Component {
    render(){
        return(
            <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">High School Programming Competition</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} componentClass={Link} href="/" to="/">Home</NavItem>
                        <NavItem eventKey={2} componentClass={Link} href="/" to="/Competitions">Competitions</NavItem>
                        <NavItem eventKey={3} componentClass={Link} href="/" to="/login">Sign In</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}