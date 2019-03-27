import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import StatusMessages from '../_common/components/status-messages/status-messages.jsx';
import TeamService from '../_common/services/team';
import DeleteIcon from '@material-ui/icons/Delete';
import AcceptIcon from '@material-ui/icons/Done';

var currentView = null;

export default class AddEventTeam extends Component {
    constructor(props) {
        super(props);
        this.statusMessages = React.createRef();
        this.state = {
            teamTable: []
        };
    }

    /*
    * Returns a list of all registered teams and events when the component is rendered.
    */
    componentDidMount = () => {
        TeamService.getAllTeams().then((response) => {
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
    * Binds a registered team to a specific event date.
    */
    handleAddTeamToEvent = () => {
        console.log("team added");
        // finish
    }

    /*
    * Removes a registered team from a specific event date.
    */
    handleRemoveTeamFromEvent = () => {
        console.log("team removed");
        // finish
    }

    /*
    * Helper function handleAddTeamToEvent. Generates the data as a table.
    */
    generateTeamTable() {
        const teams = [];
        console.log(this.state.teamTable);
        this.state.teamTable.forEach((team, index) => {
            teams.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{team.TeamName}</td>
                <td>{team.SchoolName}</td>
                <td>{team.SchoolAddress}</td>
                <td>{team.StateCode}</td>
                <td>{team.QuestionLevel}</td>
                <td>{team.AdvisorID}</td>
                <td>
                    <AcceptIcon onClick={() => this.handleAddTeamToEvent()} />
                    <DeleteIcon onClick={() => this.handleRemoveTeamFromEvent()} />
                </td>
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
                    <th>Arrived</th>
                </tr>
            </thead>
            <tbody>
                {teams}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                {currentView}
            </div>
        );
    }
}