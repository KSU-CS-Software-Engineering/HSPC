import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import StatusMessages from '../../../_common/components/status-messages/status-messages.jsx';
import UserService from '../../../_common/services/user';

var currentView = null;

/*
* @author: Daniel Bell
*/
export default class ViewUsers extends Component {
    constructor(props) {
        super(props);
        this.statusMessages = React.createRef();
        this.state = {
            userTable: []
        };
    }

    /*
    * Returns a list of all registered users when the component is rendered.
    */
    componentDidMount = () => {
        UserService.getAllUsers().then((response) => {
            if (response.statusCode === 200) {
                this.setState({ userTable: JSON.parse(response.body) }, () => {
                    this.generateUserTable(); // helper function
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
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
    * Renders the component UI.
    */
    render() {
        return (
            <div>
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                {currentView}
            </div>
        );
    }
}