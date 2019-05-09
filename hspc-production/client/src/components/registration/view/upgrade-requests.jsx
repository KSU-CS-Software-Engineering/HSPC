import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import StatusMessages from '../../../_common/components/status-messages/status-messages.jsx';
import UpgradeService from '../../../_common/services/upgrade';
import DeleteIcon from '@material-ui/icons/Delete';
import AcceptIcon from '@material-ui/icons/Done';

var currentView = null;

/*
* @author: Daniel Bell
*/
export default class UpgradeRequests extends Component {
    constructor(props) {
        super(props);
        this.statusMessages = React.createRef();
        this.state = {
            requestTable: []
        };
    }

    /*
    * Returns a list of all upgrade requests when the component is rendered.
    */
    componentDidMount = () => {
        UpgradeService.getAllUpgrades().then((response) => {
            if (response.statusCode === 200) {
                this.setState({ requestTable: JSON.parse(response.body) }, () => {
                    this.generateRequestTable(); // helper function
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Helper function for generateRequestTable. Updates the users AccessLevel.
    */
    handleAcceptRequest = (email, level) => {
        UpgradeService.acceptUpgradeRequest(email, level).then((response) => {
            if (response.statusCode === 200) {
                this.componentDidMount();
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Helper function for generateRequestTable. Deletes the user from the database.
    */
    handleDenyRequest = (email) => {
        UpgradeService.removeUpgradeRequest(email).then((response) => {
            if (response.statusCode === 200) {
                this.componentDidMount();
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
    * Renders the component UI
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