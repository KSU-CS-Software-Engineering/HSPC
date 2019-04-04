import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import QuestionButton from './question-button';
import RaisedButton from 'material-ui/RaisedButton';
import StatusMessages from '../_common/components/status-messages/status-messages';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../_common/assets/css/create-scoreboard.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import openSocket from 'socket.io-client';

const columns = [
    { dataField: 'index', text: 'ID' },
    { dataField: 'team', text: 'Team' },
    { dataField: 'school', text: 'School' },
    { dataField: 'state', text: 'State' },
    { dataField: 'level', text: 'Level' }
];

export default class BoardSetup extends Component {
    constructor(props) {
        super(props)
        this.handleSaveChanges = this.handleSaveChanges.bind(this);
        this.statusMessages = React.createRef();
        this.rows = [];
        this.rawData = '';
        this.questionAmount = 5;
        this.buttons = null;

        //scoreboard data
        this.scoreboard = [];

        this.state = {
            expanded: [],
            socket: openSocket('http://localhost:8000')
        }
        this.handleParseTableData();
    }

    /*
    * Updates the team scores and pushes the changes to the 'Live Preview' tab.
    */
    handleSaveChanges() {
        console.log(this.state.socket.id);
        var scores = [];
        for (let i = 0; i < this.rows.length; i++) {
            scores.push(this.rows[i].points);
            console.log(this.rows[i].points);
        }
        // pass data to scoreboard
        console.log("Sent:", this.scoreboard);
        this.state.socket.emit('click', this.scoreboard);
    }

    /*
    * Parses table data as soon as the information arrives.
    */
    handleParseTableData = () => {
        this.rawData = this.props.presentTeams;
        this.rawData.forEach((row, index) => {
            this.rows.push({
                index: index + 1,
                team: row.TeamName,
                school: row.SchoolName,
                state: row.StateCode,
                level: row.QuestionLevel,
                advisor: row.advisorID,
                points: 0
            })
        })
    }

    /*
    * Handles the row expansion operation.
    */
    handleOnExpand = (row, isExpand) => {
        if (isExpand)
            this.setState(() => ({ expanded: [...this.state.expanded, row.index] }));
        else
            this.setState(() => ({ expanded: this.state.expanded.filter(x => x !== row.index) }));
    }

    /*
    * Generates the Correct/Incorrect buttons within the expanded rows.
    */
    generateButtons = (index) => {
        var rowButtons = [];
        for (let i = 0; i < this.questionAmount; i++) {
            rowButtons.push(
                <QuestionButton
                    key={i}
                    questionNum={i + 1}
                    rowNum={index}
                    isCorrect={false}
                    onAnswerUpdate={(rowNum, timesClicked, questionNum, pointsAdded) => this.updateRowPoints(rowNum, timesClicked, questionNum, pointsAdded)}
                />
            );
        }
        this.buttons = rowButtons;
        this.setDefaultScoreboard();

    }

    /*
    * Sets the default scoreboard values to zero;
    */
    setDefaultScoreboard = () => {
        var arr = [];
        for (let i = 0; i < this.rows.length; i++)
            for (let j = 0; j < this.buttons.length; j++) {
                arr.push({
                    teamID: i,
                    questionNum: j,
                    timesClicked: 0,
                    pointsAdded: 0 
                });
            }
        this.scoreboard = arr
    }


    /*
    * Updates the value of points for the given team.
    */
    updateRowPoints = (rowNum, timesClicked, questionNum, pointsAdded) => {
        let curPoints = this.rows[rowNum].points + pointsAdded;
        if (curPoints < 0) {
            curPoints = 0;
        }
        else if (curPoints > this.buttons.length) {
            curPoints = this.buttons.length;
        }
        this.rows[rowNum].points = curPoints;
        this.scoreboard[(rowNum*this.questionAmount)+(questionNum)-1].timesClicked = timesClicked;
        this.scoreboard[(rowNum*this.questionAmount)+(questionNum)-1].pointsAdded = (timesClicked*0.5);
    }

    /*
    * Renders the component UI
    */
    render() {
        const expandRow = {
            renderer: row => (
                <div>
                    {this.generateButtons(row.index - 1)}
                    {this.buttons}
                </div>
            ),
            expanded: this.state.expanded,
            onExpand: this.handleOnExpand
        };
        return (
            <div>
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                <BootstrapTable
                    id="row-data"
                    keyField='index'
                    data={this.rows}
                    columns={columns}
                    expandRow={expandRow}
                />
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <RaisedButton
                            className="register-button"
                            label="Save Changes"
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