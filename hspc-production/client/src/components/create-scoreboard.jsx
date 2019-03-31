import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import StatusMessages from '../_common/components/status-messages/status-messages';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../_common/assets/css/create-scoreboard.css';

export default class BoardSetup extends Component {
    constructor(props) {
        super(props)
        this.handleSaveChanges = this.handleSaveChanges.bind(this);
        this.statusMessages = React.createRef();
        this.beginnerTable = null;
        this.advancedTable = null;
        this.state = {
            teamList: [],
            eventList: [],
            presentTeams: this.props.presentTeams,
        }
    }

    /*
    * Updates the Scoreboard values and redirects to the 'Live Preview' tab
    */
    handleSaveChanges() {
        console.log("Changes Saved");
    }

    /*
    * In Progress
    */
    generateSetupTable = () => {
        const beginner = [], advanced = [];
        var bcount = 1, acount = 1;
        this.state.presentTeams.forEach((team, index) => {
            if (team.QuestionLevel === "Beginner") {
                beginner.push(<tr key={index}>
                    <td>{bcount}</td>
                    <td>{team.TeamName}</td>
                    <td>{team.QuestionLevel}</td>
                </tr>);
                bcount++;
            }
            if (team.QuestionLevel === "Advanced") {
                advanced.push(<tr key={index}>
                    <td>{acount}</td>
                    <td>{team.TeamName}</td>
                    <td>{team.QuestionLevel}</td>
                </tr>);
                acount++;
            }
        });
        this.beginnerTable = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>Exp Level</th>
                </tr>
            </thead>
            <tbody>
                {beginner}
            </tbody>
        </Table>;

        this.advancedTable = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>Exp Level</th>
                </tr>
            </thead>
            <tbody>
                {advanced}
            </tbody>
        </Table>;
    }

    /*
    * Renders the component UI
    */
    render() {
        return (
            <div>
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                {this.generateSetupTable()}
                {this.beginnerTable}
                {this.advancedTable}
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <RaisedButton
                            className="register-button"
                            label="Save Changes"
                            style={{ margin: 15 }}
                            backgroundColor={'#00a655'}
                            labelColor={'white'}
                            onClick={(event) => this.handleSaveChanges(event)}
                        />
                    </div>
                </MuiThemeProvider>
            </div >
        )
    }
}