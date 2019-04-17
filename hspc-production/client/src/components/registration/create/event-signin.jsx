import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Select from 'react-select';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import BoardSetup from '../../scoring/create-scoreboard';
import ParticipantService from '../../../_common/services/participant';
import EventService from '../../../_common/services/event';
import StatusMessages from '../../../_common/components/status-messages/status-messages.jsx';
import '../../../_common/assets/css/event-signin.css';

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
        this.pageView = null;
        this.dataView = null;
        this.selected = [];
        this.allTeams = [];
        this.presentTeams = [];
        this.eventDate = '';
        this.state = {
            eventList: [],
            redirect: false
        }
    }

    /*
    * Returns a list of all events when the component is rendered.
    */
    componentDidMount = () => {
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
    }

    /*
    * Returns a list of teams matching the selected event date.
    */
    showRegisteredTeams = (date) => {
        this.eventDate = date;
        this.selected = [];
        ParticipantService.getAllParticipants().then((response) => {
            if (response.statusCode === 200) {
                let body = JSON.parse(response.body);
                let participants = [];
                for (let i = 0; i < body.length; i++) {
                    if (body[i].EventDate === this.eventDate) {
                        participants.push(body[i]);
                    }
                }
                this.allTeams = participants;
                // populates the selected array with false values
                for (let i = 0; i < this.allTeams.length; i++) this.selected.push(false);
                this.generateSignInTable(this.allTeams);
            }
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Helper function for showRegisteredTeams. Generates the data as a table.
    */
    generateSignInTable(data) {
        const teams = [];
        data.forEach((team, index) => {
            teams.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{team.TeamName}</td>
                <td>{team.SchoolName}</td>
                <td>{team.StateCode}</td>
                <td>{team.QuestionLevel}</td>
                <td>{team.AdvisorID}</td>
                <td key={index}>
                    <input type="checkbox" onClick={this.handleCheckboxClick} data-index={index} />
                </td>
            </tr>);
        });
        this.dataView = <Table striped bordered condensed hover>
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
    * Marks that a team has arrived.
    */
    handleCheckboxClick = (event) => {
        let index = event.target.getAttribute('data-index');
        if (this.selected[index] === false) this.selected[index] = true;
        else this.selected[index] = false;
        event.key = event.key + 1;
    }

    /*
    * Saves the information and updates the values in the database.
    */
    handleSaveChanges = () => {
        for (let i = 0; i < this.selected.length; i++) {
            if (this.selected[i] === true) this.presentTeams.push(this.allTeams[i]);
        }
        if(this.presentTeams.length >= 1){
            this.setState({redirect: true});
        }
             
    }

    /*
    * Renders the form and controls when to redirect to BoardSetup
    */
    renderRedirect = () => {
        if (!this.state.redirect) {
            this.pageView = 
                <div id="field">
                    <h2>Event Sign In</h2>
                    <p><b>Please fill out the information below.</b></p>
                    <div id="sub-nav">
                        <p id="sub-nav-item"><b>Event Date</b></p>
                        <Select
                            id="dropdown"
                            styles={selectStyles}
                            placeholder="Select an Event Date"
                            options={this.state.eventList}
                            onChange={(e) => (this.showRegisteredTeams(e.label))}
                        />
                    </div>
                    <StatusMessages ref={this.statusMessages}></StatusMessages>
                    {this.dataView}
                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <div>
                            <RaisedButton
                                className="register-button"
                                label="Begin Event"
                                backgroundColor={'#00a655'}
                                labelColor={'#ffffff'}
                                onClick={() => this.handleSaveChanges()}
                            />
                        </div>
                    </MuiThemeProvider>
                </div>
        }
        else {
            this.pageView = <BoardSetup presentTeams={this.presentTeams} />
            this.eventDate = '';
            this.presentTeams = [];
            this.selected = [];
        }
    }

    /*
    * Render the component UI
    */
    render() {
        return (
            <div>
                {this.renderRedirect()}
                {this.pageView}
            </div>
        );
    }
}