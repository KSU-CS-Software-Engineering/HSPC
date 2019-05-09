import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import StatusMessages from '../../../_common/components/status-messages/status-messages.jsx';
import TeamService from '../../../_common/services/team';

var currentView = null;

/*
* @author: Daniel Bell
*/
export default class ViewTeams extends Component {
    constructor(props) {
        super(props);
        this.statusMessages = React.createRef();
        this.advisor = this.props.advisor;
        this.state = {
            teamTable: []
        };
    }

    /*
    * Returns a list of all registered teams when the component is rendered.
    * If an advisor is logged in, the list of teams registered with that advisor is returned.
    */
    componentDidMount = () => {
        TeamService.getAllTeams()
            .then((response) => {
                var data = JSON.parse(response.body);
                if (response.statusCode === 200 && this.advisor === undefined) {
                    this.setState({ teamTable: data }, () => {
                        this.generateTeamTable(); // helper function
                    });
                }
                else if (response.statusCode === 200) {
                    var registeredTeams = [];
                    data.forEach((team, index) => {
                        if (team.AdvisorEmail === this.advisor) {
                            registeredTeams.push({
                                ID: index,
                                TeamName: team.TeamName,
                                SchoolName: team.SchoolName,
                                SchoolAddress: team.SchoolAddress,
                                StateCode: team.StateCode,
                                QuestionLevel: team.QuestionLevel,
                                AdvisorName: team.AdvisorName
                            });
                        }
                    });
                    this.setState({ teamTable: registeredTeams }, () => {
                        this.generateTeamTable(); // helper function
                    });
                }
                else console.log("An error has occurred, Please try again.");
            }).catch((resErr) => console.log('Something went wrong. Please try again'));
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
                <td>{team.AdvisorName}</td>
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

    render() {
        return (
            <div>
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                {currentView}
            </div>
        );
    }
}