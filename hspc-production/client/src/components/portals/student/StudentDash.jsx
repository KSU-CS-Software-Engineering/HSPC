import React, { Component } from 'react'
import { Navbar, Button } from 'react-bootstrap';
import './StudentDash.css';

export default class StudentDash extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                    <Navbar.Brand className="student_brand">
                            <a href="#home">Student Portal</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Text>Team Number: </Navbar.Text>
                    <Navbar.Text>Difficulty Level: </Navbar.Text>
                    <Navbar.Collapse>
                        <Navbar.Text pullRight>
                            <Button bsStyle="primary">Call Judge</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>;
            </div>
        )
    }
}