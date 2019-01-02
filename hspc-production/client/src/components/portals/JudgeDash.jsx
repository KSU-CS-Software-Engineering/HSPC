import React, { Component } from 'react'
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

export default class JudgeDash extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#home">Admin Portal</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Text pullRight>
                            <Button bsStyle="info">Question List</Button>
                            <Button bsStyle="info">Student List</Button>
                            <Button bsStyle="info">Answer Key</Button>
                            <Button bsStyle="Success">Show Scoreboard</Button>
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