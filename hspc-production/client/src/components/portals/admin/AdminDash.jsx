import React, { Component } from 'react';
import { Panel, Navbar, NavItem, Nav, Table } from 'react-bootstrap';
import userService from '../../../_common/services/user';
import StatusMessages from '../../../_common/components/status-messages/status-messages';
import './AdminDash.css';

var currentView = null; 

export default class AdminDash extends Component {
    constructor(props){
        super(props)
        this.handleShowScore = this.handleShowScore.bind(this);
        this.handleShowUsers = this.handleShowUsers.bind(this);
        this.statusMessages = React.createRef();
        this.state = { userTable: [] };
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
                this.handleShowEventHistory();
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
    handleShowEventHistory(){
        
        // finish
    }

    /*
    * Returns a list of all registered users
    */
    handleShowUsers(){
        userService.getAllUsers().then((response) => {
            if (response.statusCode === 200) {
                console.log(response.body);
                let data = JSON.parse(response.body);
                let tempCol = [];
                let i;
                
                for(i=0; i<data.length; i++){
                    let tempRow = [];
                    tempRow.push(
                        data[i].FirstName,
                        data[i].LastName,
                        data[i].Email
                    );
                    tempCol.push(tempRow);
                }
                console.log({tempCol});
                
                this.setState({userTable: tempCol}, () =>{
                    console.log("Table Created");
                    this.generateUserTable();
                })
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Helper function for handleShowUsers. Generates a table component.
    */
    generateUserTable(){ 
        currentView = <Table striped bordered condensed hover>
        <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            <tr>{this.state.userTable[0]}</tr>
        </tbody>
        </Table>
        this.forceUpdate();
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
                                onClick={this.handleShowEventHistory}
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
                    <StatusMessages ref={this.statusMessages}></StatusMessages>
                    {currentView}
                </Panel>  
            </div>
        )
    }
}