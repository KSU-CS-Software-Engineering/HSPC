import React, { Component } from 'react';
import { Panel, Navbar, Nav } from 'react-bootstrap';
//import StatusMessages from '../../../_common/components/status-messages/status-messages';
import './StudentDash.css';

export default class StudentDash extends Component {
    constructor(props){
        super(props)
        //this.statusMessages = React.createRef(); for showing error codes
        this.state = {

        };
    }
    
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>Student Portal</Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <noscript> Insert team number and level </noscript>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Panel className="page-body">
                    <p>Comming soon</p>
                </Panel>  
            </div>
        )
    }
}