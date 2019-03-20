import React, { Component } from 'react';
import Select from 'react-select';
import teamService from '../../../_common/services/team';
import eventService from '../../../_common/services/event';
import RaisedButton from 'material-ui/RaisedButton';
import { white } from 'material-ui/styles/colors';
import StatusMessages from '../../../_common/components/status-messages/status-messages';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const selectStyles = {
    menu: base => ({
        ...base,
        zIndex: 100
    })
};

export default class BoardSetup extends Component {
    constructor(props) {
        super(props)
        this.handleSaveChanges = this.handleSaveChanges.bind(this);
        this.statusMessages = React.createRef();
        this.state = {
            teamList: [],
            eventList: []
        }
    }

    /*
    * Preloads database information as the page is rendering.
    */
    componentDidMount() {
        // preloads a list of all teams.
        teamService.getAllTeams().then((response) => {
            if (response.statusCode === 200) {
                let body = JSON.parse(response.body);
                let teams = [];
                for (let i = 0; i < body.length; i++) {
                    teams.push({
                        label: body[i].TeamName,
                        value: body[i].TeamName
                    });
                }
                this.setState({ teamList: teams });
            }
            else console.log("An error has occurred, Please try again.");

            // preloads a list of all events.
            eventService.getAllEvents().then((response) => {
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
    * Updates the Scoreboard values and redirects to the 'Live Preview' tab
    */
    handleSaveChanges() {
        console.log("Changes Saved");

        // finish
    }

    /*
    * Renders the component UI
    */
    render() {
        return (
            <div className="board">
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                <div className="banner">
                    <Select
                        id="dropdown"
                        styles={selectStyles}
                        placeholder="Select a Team Name"
                        options={this.state.teamList}
                        onChange={opt => this.setState({ teamName: opt.label })}
                    />
                    <Select
                        id="dropdown"
                        styles={selectStyles}
                        placeholder="Select an Event Date"
                        options={this.state.eventList}
                        onChange={opt => this.setState({ teamName: opt.label })}
                    />
                </div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <RaisedButton
                            className="RegisterButton"
                            label="Save Changes"
                            style={{ margin: 15 }}
                            backgroundColor={'#00a655'}
                            labelColor={white}
                            onClick={(event) => this.handleSaveChanges(event)}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}