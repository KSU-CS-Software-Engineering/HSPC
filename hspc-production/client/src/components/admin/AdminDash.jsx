import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Table, NavDropdown, Jumbotron } from 'react-bootstrap';
import userService from '../../_common/services/user';
import teamService from '../../_common/services/team';
import upgradeService from '../../_common/services/upgrade';
import eventService from '../../_common/services/event';
import StatusMessages from '../../_common/components/status-messages/status-messages.jsx';
import Register from '../register/Register.jsx';
import RegisterTeam from '../register/RegisterTeam.jsx';
import Scoreboard from '../scoreboard/Scoreboard.jsx';
import BoardSetup from '../scoreboard/BoardSetup.jsx';
import CreateEvent from '../events/CreateEvent';
import CreateNews from '../news/CreateNews';
import AddUser from '../register/AddUser.jsx';
import DeleteIcon from '@material-ui/icons/Delete';
import AcceptIcon from '@material-ui/icons/Done';
import Email from '../email/Email';
import '../register/Register.css';
import './AdminDash.css';

var currentView = null;

export default class AdminDash extends Component {
    constructor(props) {
        super(props)
        this.handleShowScore = this.handleShowScore.bind(this);
        this.handleShowUsers = this.handleShowUsers.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleCreateTeam = this.handleCreateTeam.bind(this);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
        this.handleAddToTeam = this.handleAddToTeam.bind(this);
        this.handleShowTeams = this.handleShowTeams.bind(this);
        this.handleAcceptRequest = this.handleAcceptRequest.bind(this);
        this.handleDenyRequest = this.handleDenyRequest.bind(this);
        this.handlePendingRequests = this.handlePendingRequests.bind(this);
        this.handleShowEventHistory = this.handleShowEventHistory.bind(this);
        this.handleCreateEmail = this.handleCreateEmail.bind(this);
        this.handleEditBoard = this.handleEditBoard.bind(this);
        this.handleCreateNews = this.handleCreateNews.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.statusMessages = React.createRef();
        this.currentView = null;
        this.state = {
            userTable: [],
            eventTable: [],
            teamTable: [],
            requestTable: [],
        };
    }

    /*
    * Renders the Register.jsx component. Prompts the user to create a new user.
    */
    handleCreateUser() {
        currentView = <Register />;
        this.forceUpdate();
    }

    /*
    * Renders the RegisterTeam.jsx component. Prompts the user to create a new team.
    */
    handleCreateTeam() {
        currentView = <RegisterTeam />
        this.forceUpdate();
    }

    /*
    * Renders the AddUser.jsx component. Prompts the user to a new team member or update their information.
    */
    handleAddToTeam() {
        currentView = <AddUser />
        this.forceUpdate();
    }

    /*
    * Renders the CreateEvent.jsx component. Prompts the user to create a new event.
    */
    handleCreateEvent() {
        currentView = <CreateEvent />
        this.forceUpdate();
    }

    /*
    * Renders the Scoreboard.jsx component. Only available to users with an access level of >3 by default. 
    */
    handleShowScore() {
        currentView = <Scoreboard />
        this.forceUpdate();
    }

    /*
    * IN PROGRESS
    * Renders the Email.jsx component. Only available to users with an access level of >3 by default. 
    */
    handleCreateEmail() {
        currentView = <Email />
        this.forceUpdate();
    }

    /*
    * IN PROGRESS
    * Renders the BoardSetup.jsx component. Only available to users with an access level of >=3 by default. 
    */
    handleEditBoard() {
        currentView = <BoardSetup />
        this.forceUpdate();
    }

    handleCreateNews(){
        currentView = <CreateNews />
        this.forceUpdate();
    }

    /*
    * Shows outstanding requests for a higher level accounts.
    */
    handlePendingRequests() {
        upgradeService.getAllUpgrades().then((response) => {
            console.log(JSON.parse(response.body));
            if (response.statusCode === 200) {
                this.setState({ requestTable: JSON.parse(response.body) }, () => {
                    this.generateRequestTable(); // helper function
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Returns a JSON message of all registered users. Helper function needed to generate this data as a table.
    */
    handleShowUsers() {
        userService.getAllUsers().then((response) => {
            if (response.statusCode === 200) {
                this.setState({ userTable: JSON.parse(response.body) }, () => {
                    this.generateUserTable(); // helper function
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Returns a JSON message of all registered teams. Helper function needed to generate this data as a table.
    */
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

    /*
    * Returns a JSON message of all scheduled events. Helper function needed to generate this data as a table.
    */
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

    /*
    * Helper function for generateRequestTable. Updates the users AccessLevel.
    */
    handleAcceptRequest(email, level) {
        upgradeService.acceptUpgradeRequest(email, level).then((response) => {
            if (response.statusCode === 200) {
                this.handlePendingRequests();
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Helper function for generateRequestTable. Deletes the user from the database.
    */
    handleDenyRequest(email) {
        upgradeService.removeUpgradeRequest(email).then((response) => {
            if (response.statusCode === 200) {
                this.handlePendingRequests();
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Helper function for handlePendingRequests. Generates the data as a table.
    */
    generateRequestTable() {
        const requests = [];
        this.state.requestTable.forEach((request, index) => {
            requests.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{request.TeamName}</td>
                <td>{request.FirstName}</td>
                <td>{request.LastName}</td>
                <td>{request.Email}</td>
                <td>{request.Phone}</td>
                <td>{request.RequestLevel}</td>
                <td>
                    <AcceptIcon onClick={() => this.handleAcceptRequest(request.Email, request.RequestLevel)} />
                    <DeleteIcon onClick={() => this.handleDenyRequest(request.Email)} />
                </td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Requested Level</th>
                    <th>Activate</th>
                </tr>
            </thead>
            <tbody>
                {requests}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    /*
    * Helper function for handleShowEvent. Generates the data as a table.
    */
    generateEventTable() {
        const events = [];
        console.log(this.state.eventTable);
        this.state.eventTable.forEach((event, index) => {
            events.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{event.EventLocation}</td>
                <td>{event.EventDate}</td>
                <td>{event.EventTime}</td>
                <td>{event.EventDescription}</td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {events}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    /*
    * Helper function for handleShowUsers. Generates the data as a table.
    */
    generateUserTable() {
        const users = [];
        this.state.userTable.forEach((user, index) => {
            users.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{user.TeamName}</td>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.Email}</td>
                <td>{user.Phone}</td>
                <td>{user.AccessLevel}</td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Account Level</th>
                </tr>
            </thead>
            <tbody>
                {users}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    /*
    * Helper function for handleShowTeams. Generates the data as a table.
    */
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

    /*
    * Resets the currentView property to null and clears the screen.
    */
    clearAll() {
        currentView = null;
        this.forceUpdate();
    }

    /*
    *  Renders the component UI.
    */
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand
                            onClick={this.clearAll}>
                            Admin Portal
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown title="Users" id="basic-nav-dropdown">
                                <NavItem eventKey={1} onClick={this.handlePendingRequests}>Upgrade Requests</NavItem>
                                <NavItem eventKey={2} onClick={this.handleCreateUser}>Create User</NavItem>
                                <NavItem eventKey={3} onClick={this.handleShowUsers}>View Users</NavItem>
                            </NavDropdown>

                            <NavDropdown title="Teams" id="basic-nav-dropdown">
                                <NavItem eventKey={4} onClick={this.handleCreateTeam}>Create Team</NavItem>
                                <NavItem eventKey={5} onClick={this.handleAddToTeam}>Add To Team</NavItem>
                                <NavItem eventKey={6} onClick={this.handleShowTeams}>View Teams</NavItem>
                            </NavDropdown>

                            <NavDropdown title="Events" id="basic-nav-dropdown">
                                <NavItem eventKey={7} onClick={this.handleCreateEvent}>Schedule Event</NavItem>
                                <NavItem eventKey={8} onClick={this.handleShowEventHistory}>View Events</NavItem>
                            </NavDropdown>

                            <NavDropdown title="Scoreboard" id="basic-nav-dropdown">
                                <NavItem eventKey={9} onClick={this.handleShowScore}>Preview</NavItem>
                                <NavItem eventKey={10} onClick={this.handleEditBoard}>Edit</NavItem>
                            </NavDropdown>

                            <NavItem eventKey={11} onClick={this.handleCreateEmail}>Contact</NavItem>
                            <NavItem eventKey={12} onClick={this.handleCreateNews}>News</NavItem>
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