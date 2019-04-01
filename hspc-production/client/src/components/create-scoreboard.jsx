import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import RaisedButton from 'material-ui/RaisedButton';
import StatusMessages from '../_common/components/status-messages/status-messages';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../_common/assets/css/create-scoreboard.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export default class BoardSetup extends Component {
    constructor(props) {
        super(props)
        this.handleSaveChanges = this.handleSaveChanges.bind(this);
        this.statusMessages = React.createRef();
        this.row = null;
        this.columns = null;
        this.subrows = [];
        this.subcols = [];
        this.currentRow = '';
        this.currentCell = '';
        this.questionAmount = 5;
        this.state = {
            teamList: [],
            eventList: [],
            expanded: [],
            questionData: []
        }
    }

    /*
    * Parses table data as soon as the information arrives.
    */
    handleParseTableData = () => {
        var rawData = this.props.presentTeams;
        var parsedRows = [];
        var index = 1;
        rawData.forEach((row) => {
            parsedRows.push({
                index: index,
                team: row.TeamName,
                school: row.SchoolName,
                state: row.StateCode,
                level: row.QuestionLevel,
                advisor: row.advisorID,
                points: 0
            })
            index++;
        })
        this.rows = parsedRows;
        this.columns = [
            { dataField: 'index', text: 'ID' },
            { dataField: 'team', text: 'Team' },
            { dataField: 'school', text: 'School' },
            { dataField: 'state', text: 'State' },
            { dataField: 'level', text: 'Level' },
            { dataField: 'advisor', text: 'Advisor' },
            { dataField: 'points', text: 'Points' }
        ];
        this.handleSetQuestions();
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
    * Updates the Scoreboard values and redirects to the 'Live Preview' tab
    */
    handleSaveChanges() {
        console.log("Changes Saved");
        console.log(this.subrows, this.subcols);
    }

    /*
    * Dynamically sets the number of questions.
    */
    handleSetQuestions = () => {
        var rows = [];
        for (let index = 1; index <= this.questionAmount; index++)
            rows.push({ index: index, answer: "false" })
        
        this.subrows.push(rows);
        this.subcols.push(
            { dataField: 'index', text: 'Question' },
            { dataField: 'answer', text: 'Answer' }
        );
    }

    /*
    * Renders the component UI
    */
    render() {
        const expandRow = {
            renderer: row => (
                <div>
                    <BootstrapTable
                        keyField='index'
                        data={this.subrows}
                        columns={this.subcols}
                        cellEdit={cellEditFactory({
                            mode: 'click',
                            blurToSave: true,
                            nonEditableRows: () => [0]
                        })}
                    />
                </div>
            ),
            expanded: this.state.expanded,
            onExpand: this.handleOnExpand
        };
        return (
            <div>
                {this.handleParseTableData()}
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                <BootstrapTable
                    id="row-data"
                    keyField='index'
                    data={this.rows}
                    columns={this.columns}
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

