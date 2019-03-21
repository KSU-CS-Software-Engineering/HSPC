import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Jumbotron } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import StatusMessages from '../../_common/components/status-messages/status-messages';
import './Competitions.css';

var beginner2018 = require('../../_common/assets/beginner2018.pdf');
var advanced2018 = require('../../_common/assets/advanced2018.pdf');
var beginnerScore2018 = require('../../_common/assets/beginnerScore2018.pdf');
var advancedScore2018 = require('../../_common/assets/advancedScore2018.pdf');
var currentView = null;

export default class Competitions extends Component {
    constructor(props) {
        super(props)
        this.clearAll = this.clearAll.bind(this);
        this.statusMessages = React.createRef();
        this.handleCreateProblems = this.handleCreateProblems.bind(this);
        // this.handleGenerateRules = this.handleGenerateRules.bind(this);
        // this.handleRegGuide = this.handleRegGuide.bind(this);
        // this.handleScorecards = this.handleScorecards.bind(this);
        // this.handleTransport = this.handleTransport.bind(this)
    }

    /*
    * Generates the view for the problems and solutions tab andgenerates buttons for to open the PDFs
    */
    handleCreateProblems = (event) => {
        currentView =
            <div>
                <Jumbotron>
                    <h2>Problems and Solutions</h2>
                    <MuiThemeProvider>
                        <RaisedButton
                            className="Problems"
                            label="Beginning Problems and Solutions 2018"
                            style={{ margin: 15 }}
                            backgroundColor={'#350B4F'}
                            labelColor={'white'}
                            onClick={(event) => this.handleOpenFile(beginner2018)}
                        />
                        <br />
                        <RaisedButton
                            className="Problems"
                            label="Advanced Problems and Solutions 2018"
                            style={{ margin: 15 }}
                            backgroundColor={'#350B4F'}
                            labelColor={'white'}
                            onClick={(event) => this.handleOpenFile(advanced2018)}
                        />
                    </MuiThemeProvider>
                </Jumbotron>
            </div>;
        this.forceUpdate();

    }

    /*
    * Opens PDFs in another window from the Docs folder in the public directory
    * Takes two strings to represent the folder and file names as arguments 
    */
    handleOpenFile(File) {
        console.log('made it here');
        console.log(File);
        currentView =
            <object className="pdf" data={File} type="application/pdf">
                <embed src={File} type="application/pdf" />
            </object>
        this.forceUpdate();
    }

    /*
    * Handles the showing of Scorecard pdf files. Files must be imported above to be used.
    */
    handleScorecards = (event) => {
        currentView =
            <div>
                <Jumbotron>
                    <h2>Scorecards</h2>
                    <MuiThemeProvider>
                        <RaisedButton
                            className="Scorecards"
                            label="Fall 2018 Competition Scorecard - Beginning Teams"
                            style={{ margin: 15 }}
                            backgroundColor={'#350B4F'}
                            labelColor={'white'}
                            onClick={(event) => this.handleOpenFile(beginnerScore2018)}
                        />
                        <br />
                        <RaisedButton
                            className="Scorecards"
                            label="Fall 2018 Competition Scorecard - Advanced Teams"
                            style={{ margin: 15 }}
                            backgroundColor={'#350B4F'}
                            labelColor={'white'}
                            onClick={(event) => this.handleOpenFile(advancedScore2018)}
                        />
                    </MuiThemeProvider>
                </Jumbotron>
            </div>;
        this.forceUpdate();
    }

    /*
    * Resets the tab to it's default view.
    */
    clearAll() {
        currentView = null;
        this.forceUpdate();
    }

    /*
    * Renders the component UI.
    */
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand
                            onClick={this.clearAll}>
                            Competitions
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} onClick={this.handleCreateProblems}>Problems and Solutions</NavItem>
                            <NavItem eventKey={2} onClick={this.handleScorecards}>Scorecards</NavItem>
                            {/*  <NavItem eventKey={3} onClick={this.handleRegRules}>Registration</NavItem>
                            <NavItem eventKey={4} onClick={this.handleGenerateRules}>Rules</NavItem>
                            <NavItem eventKey={5} onClick={this.handleTransport}>Transportation</NavItem> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Jumbotron className="page-body">
                    <StatusMessages ref={this.statusMessages}></StatusMessages>
                    {currentView}
                </Jumbotron>
            </div>
        );
    }
}