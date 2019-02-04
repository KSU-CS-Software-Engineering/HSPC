import React, { Component } from 'react';
import { Panel, Navbar, NavItem, Nav, Table } from 'react-bootstrap';
import userService from '../../../_common/services/user';
import StatusMessages from '../../../_common/components/status-messages/status-messages';
import Register from '../../Register.jsx';
import Scoreboard from '../scoreboard/Scoreboard.jsx'
import './AdminDash.css';

var currentView = null;

export default class AdminDash extends Component {
    constructor(props) {
        super(props)
        this.handleShowScore = this.handleShowScore.bind(this);
        this.handleShowUsers = this.handleShowUsers.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.statusMessages = React.createRef();
        this.state = { userTable: [] };
    }

    /*
    * Shows outstanding requests for a higher level accounts.
    */
    handlePendingRequests() {

        // finish
    }

    /*
    * Handles the registration of a new students, volunteers, judges, and adviosrs.
    */
    handleCreateUser() {
        currentView = <Register />;
        this.forceUpdate();
    }

    /*
    * Returns a list of all registered users
    */
    handleShowUsers() {
        userService.getAllUsers().then((response) => {
            if (response.statusCode === 200) {
                this.setState({ userTable: JSON.parse(response.body) }, () => {
                    this.generateUserTable();
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Prompts the user to create a new event.
    */
    handleCreateEvent(){

        // finish
    }

    /*
    * Shows a table of previous events and participants.
    */
    handleShowEventHistory() {

        // finish
    }

    /*
    * Renders the hidden scoreboard.
    */
    handleShowScore() {
        currentView = <Scoreboard />
        this.forceUpdate();
    }

    /*
    * Helper function for handleShowUsers. Generates a table component.
    */
    generateUserTable() {
        const users = [];
        this.state.userTable.forEach((user, index) => {
            users.push(<tr key={index}>
                <td>{index}</td>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.Email}</td>
            </tr>);
        });
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
                {users}
            </tbody>
        </Table>;
        this.forceUpdate();
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
                                onClick={this.handleCreateUser}
                                eventKey={2}>
                                Add User
                            </NavItem>
                            
                            <NavItem
                                onClick={this.handleShowUsers}
                                eventKey={3}>
                                User List
                            </NavItem>

                            <NavItem
                                onClick={this.handleCreateEvent}
                                eventKey={4}>
                                New Event
                            </NavItem>

                            <NavItem
                                onClick={this.handleShowEventHistory}
                                eventKey={5}>
                                Event History
                            </NavItem>

                            <NavItem
                                onClick={this.handleShowScore}
                                eventKey={6}>
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