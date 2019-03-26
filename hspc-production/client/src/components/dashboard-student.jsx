import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Jumbotron } from 'react-bootstrap';
import StatusMessages from '../_common/components/status-messages/status-messages.jsx';
import '../_common/assets/css/dashboard-student.css';

var currentView = null;

export default class StudentDash extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.state = {};
    }

    /*
    * Resets the currentView property to null and clears the screen.
    */
    clearAll = () => {
        currentView = null;
        this.forceUpdate();
    }

    /*
    * Renders the component UI.
    */
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand
                            onClick={this.clearAll}>
                            Student Portal
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1}>Questions</NavItem>
                            <NavItem eventKey={2}>Events</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Jumbotron className="page-body">
                    <StatusMessages ref={this.statusMessages}></StatusMessages>
                    {currentView}
                </Jumbotron>
            </div>
        )
    }
}