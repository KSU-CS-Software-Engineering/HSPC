import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './AdminDash.css';

export default class AdminDash extends Component {
    render() {
        return (
            <div>
                <Navbar className="subnav">
                    <Navbar.Header>
                        <Navbar.Brand className="admin_brand">
                            <h1>Admin Portal</h1>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        
                    </Navbar.Header>
                    <Navbar.Collapse className="content_ribbon">
                        <Navbar.Text pullRight className="buttonlist">
                            <Button bsStyle='info'>Pending Requests</Button>
                            <Button bsStyle='info'>Create Team</Button>
                            <Button bsStyle='info'>View Users</Button>
                            <Button bsStyle='info'>History</Button>
                            <Button bsStyle='success'>Show Scoreboard</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>;
            </div>
        )
    }
}