import React, { Component } from 'react';
import { Panel, Navbar, NavItem, Nav } from 'react-bootstrap';
//import StatusMessages from '../../../_common/components/status-messages/status-messages';
import './AdvisorDash.css';

export default class AdvisorDash extends Component {
    constructor(props){
        super(props)
        //this.statusMessages = React.createRef(); for showing error codes
        this.state = {

        };
    }
    
    /*
    * Parent function for switching between tabs
    */
    handleChangeTab(){
        console.log(this.state.activeTab);
        switch(this.state.activeTab){
            case 'Registered Teams': 
                this.handleShowTeams();
                break;
            case 'Create Team':
                this.handleCreateTeams();
                break;
            default:
                console.log("error occurred");
        }
    }

    /*
    * Shows outstanding requests for a higher level accounts.
    */
    handleShowTeams(){
        
        // finish
    }

    /*
    * Prompts the user to create a team from existing users.
    */
    handleCreateTeams(){
        
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
                                onClick={this.handleShowTeams}
                                eventKey={1}>
                                Registered Teams
                            </NavItem>

                            <NavItem 
                                onClick={this.handleShowUsers}
                                eventKey={2}>
                                Create Team
                            </NavItem>
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