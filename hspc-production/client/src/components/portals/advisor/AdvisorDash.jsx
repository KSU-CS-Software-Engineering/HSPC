import React, { Component } from 'react';
import { Panel, Navbar, NavItem, Nav } from 'react-bootstrap';
import StatusMessages from '../../../_common/components/status-messages/status-messages';
import './AdvisorDash.css';

const currentView = null;

export default class AdvisorDash extends Component {
    constructor(props){
        super(props)
        this.statusMessages = React.createRef();
        this.state = { };
    }

    /*
    * Prompts the user to create a team from existing users.
    */
    handleCreateTeams(){
        
        // finish
        // Test comment for GitKraken.
    }

    /*
    * Shows outstanding requests for a higher level accounts.
    */
    handleShowTeams(){
        
        // finish
    }

    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>Advisor Portal</Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem 
                                onClick={this.handleCreateTeams}
                                eventKey={1}>
                                Create Team
                            </NavItem>
                            <NavItem 
                                onClick={this.handleShowTeams}
                                eventKey={2}>
                                Registered Teams
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Panel className="page-body">
                    <StatusMessages ref={this.statusMessages}></StatusMessages>
                    {currentView}
                </Panel> 
            </div>
        )
    }
}