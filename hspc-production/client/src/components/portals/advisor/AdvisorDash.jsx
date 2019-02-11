import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Table, NavDropdown, Jumbotron } from 'react-bootstrap';
import teamService from '../../../_common/services/team';
import StatusMessages from '../../../_common/components/status-messages/status-messages.jsx';
import RegisterTeam from '../register/RegisterTeam.jsx';
import AddUser from '../register/AddUser.jsx';
import eventService from '../../../_common/services/event';
import '../../portals/register/Register.css';
import './AdvisorDash.css';

var currentView = null;

export default class AdminDash extends Component {
    constructor(props) {
        super(props)
        this.handleCreateTeam = this.handleCreateTeam.bind(this);
        this.handleAddToTeam = this.handleAddToTeam.bind(this);
        this.handleShowTeams = this.handleShowTeams.bind(this);
        this.handleShowEventHistory = this.handleShowEventHistory.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.statusMessages = React.createRef();
        this.state = {
            teamTable: []
        };
    }

    /*************************************************************************************
    * Renders the RegisterTeam.jsx component.
    * Prompts the user to create a new team and saves the information to the database.
    *************************************************************************************/
    handleCreateTeam() {
        currentView = <RegisterTeam />
        this.forceUpdate();
    }

    /*************************************************************************************
    * Renders the AddUser.jsx component.
    * Prompts the user to a new team member and updates the information to the database.
    *************************************************************************************/
    handleAddToTeam() {
        currentView = <AddUser />
        this.forceUpdate();
    }

    /*************************************************************************************
    * Returns a JSON message of all registered teams.
    * Helper function needed to generate this data as a table.
    **************************************************************************************/
    handleShowTeams() {
        teamService.getAllTeams().then((response) => {
            if (response.statusCode === 200) {
                console.log(JSON.parse(response.body));
                this.setState({ teamTable: JSON.parse(response.body) }, () => {
                    this.generateTeamTable(); // helper function
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /**************************************************************************************
    * Returns a JSON message of all scheduled events.
    * Helper function needed to generate this data as a table.
    **************************************************************************************/
    handleShowEventHistory() {
        eventService.getAllEvents().then((response) => {
            if (response.statusCode === 200) {
                this.setState({ eventTable: JSON.parse(response.body) }, () => {
                    this.generateEventTable(); // helper function
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /**************************************************************************************
    * Helper function for handleShowEvent. Generates the data as a table.
    **************************************************************************************/
    generateEventTable() {
        const events = [];
        console.log(this.state.eventTable);
        this.state.eventTable.forEach((event, index) => {
            events.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{event.EventLocation}</td>
                <td>{event.EventDate}</td>
                <td>{event.EventTime}</td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {events}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    /**************************************************************************************
    * Helper function for handleShowTeams. Generates the data as a table.
    **************************************************************************************/
    generateTeamTable() {
        const teams = [];
        this.state.teamTable.forEach((team, index) => {
            teams.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{team.TeamName}</td>
                <td>{team.SchoolName}</td>
                <td>{team.SchoolAddress}</td>
                <td>{team.StateCode}</td>
                <td>{team.QuestionLevel}</td>
                <td>{team.AdvisorID}</td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>School</th>
                    <th>Address</th>
                    <th>State</th>
                    <th>Level</th>
                    <th>Advisor</th>
                </tr>
            </thead>
            <tbody>
                {teams}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    /*************************************************************************************
    * Resets the currentView property to null and clears the screen.
    *************************************************************************************/
    clearAll() {
        currentView = null;
        this.forceUpdate();
    }

    /**************************************************************************************
     *  Renders the component UI.
    **************************************************************************************/
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand
                            onClick={this.clearAll}>
                            Advisor Portal
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown title="Teams" id="basic-nav-dropdown">
                                <NavItem eventKey={1} onClick={this.handleCreateTeam}>Create Team</NavItem>
                                <NavItem eventKey={2} onClick={this.handleAddToTeam}>Add Student</NavItem>
                                <NavItem eventKey={3} onClick={this.handleShowTeams}>View Teams</NavItem>
                            </NavDropdown>
                            <NavItem eventKey={4} onClick={this.handleShowEventHistory}>View Events</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Jumbotron className="page-body">
                    <StatusMessages ref={this.statusMessages}></StatusMessages>
                    {currentView}
                </Jumbotron>
            </div>
        )
    }
}