import React, { Component } from 'react'
import { Jumbotron, Navbar, Button } from 'react-bootstrap';

export default class VolunteerDash extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#home">Volunteer Portal</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Text pullRight>
                            <Button bsStyle="info">Question List</Button>
                            <Button bsStyle="info">Student List</Button>
                            <Button bsStyle="info">Team List</Button>
                            <Button bsStyle="info">Answer Key</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>;
                <Jumbotron>
                    <p>Under Contrustion.</p>
                </Jumbotron>
            </div>
        )
    }
}