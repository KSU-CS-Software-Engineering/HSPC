import React, { Component } from 'react';
import { Panel, Navbar, NavItem, Nav } from 'react-bootstrap';
import userService from '../../../_common/services/user';
//import StatusMessages from '../../../_common/components/status-messages/status-messages';
import './AdminDash.css';

export default class AdminDash extends Component {
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
            case 'Pending Requests': 
                this.handlePendingRequests();
                break;
            case 'Teams':
                this.handleCreateTeams();
                break;
            case 'Events':
                this.handleShowHistory();
                break;
            case 'Users':
                this.handleShowUsers();
                break;
            case 'Scoreboard':
                this.handleShowScore();
                break;
            default:
                console.log("error occurred");
        }
    }

    /*
    * Shows outstanding requests for a higher level accounts.
    */
    handlePendingRequests(){
        
        // finish
    }

    /*
    * Prompts the user to create a team from existing users.
    */
    handleCreateTeams(){
        
        // finish
    }

    /*
    * Shows a table of previous events and participants.
    */
    handleShowHistory(){
        
        // finish
    }

    /*
    * Returns a list of all registered users
    */
    handleShowUsers(){
        userService.getAllUsers().then((response) => {
            if (response.statusCode === 200) {
                alert(response);
                // render user list
                // fix 404 error
            }
        })
    }

    /*
    * Renders the hidden scoreboard.
    */
    handleShowScore(){
        this.props.history.push('../scoreboard/Scoreboard');
    }

    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>Admin Portal</Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem 
                                onClick={this.handlePendingRequests}
                                eventKey={1}>
                                Pending Requests
                            </NavItem>

                            <NavItem 
                                onClick={this.handleShowUsers}
                                eventKey={2}>
                                Users
                            </NavItem>
                            
                            <NavItem 
                                onClick={this.handleShowHistory}
                                eventKey={3}>
                                Events
                            </NavItem>
                            
                            <NavItem 
                                onClick={this.handleShowScore}
                                eventKey={4}>
                                Scoreboard
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