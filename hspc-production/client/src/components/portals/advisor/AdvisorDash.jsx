import React, { Component } from 'react';
import Axios from 'axios';
import userService from '../../../_common/services/user';
import { Panel, Navbar, NavItem, Nav } from 'react-bootstrap';
import StatusMessages from '../../../_common/components/status-messages/status-messages';
import './AdvisorDash.css';

var currentView = null;

export default class AdvisorDash extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.state = {};
    }

    /*
    * Prompts the user to create a team from existing users.
    */
    handleCreateTeams() {

        // add search data in running tab.

        var teamData={
            //"first_name": this.state.first_name,
            //"last_name":this.state.last_name,
            //"email":this.state.email,
        }
        this.submitTeamCreation(teamData);
    }

    /*
    * Helper function for handleCreateTeams. Post request for adding team data to the database.
    */
    submitTeamCreation(teamData){
        var apiBaseUrl = "http://localhost:3001";
        Axios.post(apiBaseUrl + '/user/createteam', teamData) // api contoller location.
       .then((response) => {
            console.log(response);
            if (response.status === 201) {
                this.statusMessages.current.showSuccess("Team Created Successfully!");
            }
            else
                this.statusMessages.current.showError('Something went wrong. Please try again');
        })
        .catch((error) => {
            this.statusMessages.current.showError('Something went wrong. Please try again.');
        });
    }

    /*
    * Shows outstanding requests for a higher level accounts.
    */
    handleShowTeams() {
        userService.getAllTeams().then((response) => {
            if (response.statusCode === 200) {
                this.setState({ userTable: JSON.parse(response.body) }, () => {

                    // Function call to display a table of teams.

                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }


    /*
    * Modifies a specific value within a selection of team data.
    */
    handleModifyTeam(){
        
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