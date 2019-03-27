
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Select from 'react-select';
import TeamService from '../_common/services/team';
import EventService from '../_common/services/event';
import StatusMessages from '../_common/components/status-messages/status-messages.jsx';
import '../_common/assets/css/event-signin.css';


var currentView = null;

const selectStyles = {
    menu: base => ({
        ...base,
        zIndex: 100
    })
};

export default class EventSignIn extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.state = {
            teamTable: [],
            eventList: [],
        }
    }

    /*
    * Returns a list of all teams when the component is rendered.
    */
    componentDidMount = () => {
        TeamService.getAllTeams().then((response) => {
            console.log(JSON.parse(response.body));
            if (response.statusCode === 200) {
                this.setState({ teamTable: JSON.parse(response.body) }, () => {
                    this.generateSignInTable(); // helper function
                });
            }
            else console.log("An error has occurred, Please try again.");

            EventService.getAllEvents().then((response) => {
                if (response.statusCode === 200) {
                    let body = JSON.parse(response.body);
                    let events = [];
                    for (let i = 0; i < body.length; i++)
                        events.push({
                            label: body[i].EventDate,
                            value: body[i].EventDate
                        });
                    this.setState({ eventList: events });
                }
                else console.log("An error has occurred, Please try again.");
            }).catch((resErr) => console.log('Something went wrong. Please try again'));
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Marks that a team has arrived.
    */
    handleChange = (index) => {
        console.log(this.state.teamTable);
        console.log("Arrived");
    }

    /*
    * Helper function for handleShowTeams. Generates the data as a table.
    */
    generateSignInTable() {
        const teams = [];
        this.state.teamTable.forEach((team, index) => {
            teams.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{team.TeamName}</td>
                <td>{team.SchoolName}</td>
                <td>{team.StateCode}</td>
                <td>{team.QuestionLevel}</td>
                <td>{team.AdvisorID}</td>
                <td>
                    <input
                        type="checkbox"
                        onChange={this.handleChange(team.TeamName)}
                    />
                </td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>School</th>
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

    /*
    * Render the component UI
    */
    render() {
        return (
            <div id="field">
                <div id="sub-nav">
                    <h4 id="sub-nav-item">Event Date</h4>
                    <Select
                        id="dropdown"
                        styles={selectStyles}
                        placeholder="Select an Event Date"
                        options={this.state.eventList}
                        onChange={opt => this.setState({ teamName: opt.label })}
                    />
                </div>
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                {currentView}
            </div>
        );
    }
}