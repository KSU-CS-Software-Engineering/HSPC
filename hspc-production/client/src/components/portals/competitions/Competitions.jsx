import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Jumbotron } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { white } from 'material-ui/styles/colors';
import StatusMessages from '../../../_common/components/status-messages/status-messages';
import './Competitions.css';

var currentView = null;

export default class Competitions extends Component {

    constructor(props) {
        super(props)
        this.clearAll = this.clearAll.bind(this);
        //this.statusMessages = React.createRef();

        this.handleCreateProblems = this.handleCreateProblems.bind(this);
        // this.handleGenerateRules = this.handleGenerateRules.bind(this);
        // this.handleRegGuide = this.handleRegGuide.bind(this);
        // this.handleScorecards = this.handleScorecards.bind(this);
        // this.handleTransport = this.handleTransport.bind(this)

        this.statusMessages = React.createRef();
        this.state = {};
    }
    
    /*************************************************************************************
    * Generates the view for the problems and solutions tab
    * Also generates buttons for to open the PDFs
    * TODO: Make function to autogenereate buttons based on folder contents
    *************************************************************************************/

    handleCreateProblems = (event) => {
        currentView = <div><Jumbotron>
            <h2>Problems and Solutions</h2>
        </Jumbotron>
            <MuiThemeProvider>
                <RaisedButton
                    className="Problems"
                    label="Beginning Problems and Solutions 2014"
                    style={{ margin: 15 }}
                    backgroundColor={'#350B4F'}
                    labelColor={white}
                    onClick={(event) => this.handleOpenFile('Problems', 'Beginning Problems and Solutions2014')}
                />
                <RaisedButton
                    className="Problems"
                    label="Advanced Problems and Solutions 2014"
                    style={{ margin: 15 }}
                    backgroundColor={'#350B4F'}
                    labelColor={white}
                    onClick={(event) => this.handleOpenFile('Problems', 'Advanced Problems and Solutions2014')}
                />
            </MuiThemeProvider>
        </div>;
        this.forceUpdate();

    }

    /*************************************************************************************
    * Opens PDFs in another window from the Docs folder in the public directory
    * Takes two strings to represent the folder and file names as arguments 
    *************************************************************************************/

    handleOpenFile = (Folder, File) => {
        window.open('Docs/' + Folder + '/' + File + '.pdf');
    }

    // handleGenerateRules = (event) => {
    //     null;
    // }

    // handleRegGuide = (event) => {
    //     null;
    // }

    /*************************************************************************************
    * 
    * 
    *************************************************************************************/

    handleScorecards = (event) => {
        currentView = <div><Jumbotron>
            <h2>Scorecards</h2>
        </Jumbotron>
            <MuiThemeProvider>
                <RaisedButton
                    className="Scorecards"
                    label="Fall 2016 Competition Scorecard - Beginning Teams"
                    style={{ margin: 15 }}
                    backgroundColor={'#350B4F'}
                    labelColor={white}
                    onClick={(event) => this.handleOpenFile('Scorecards', 'HSPC Scorecard Beginning 2016_0')}
                />
                <RaisedButton
                    className="Scorecards"
                    label="Fall 2016 Competition Scorecard - Advanced Teams"
                    style={{ margin: 15 }}
                    backgroundColor={'#350B4F'}
                    labelColor={white}
                    onClick={(event) => this.handleOpenFile('Scorecards', 'HSPC Scorecard Advanced 2016_0')}
                />
            </MuiThemeProvider>
        </div>;
        this.forceUpdate();

    }

    // handleTransport = (event) => {
    //     null;
    // }


    clearAll() {
        currentView = null;
        this.forceUpdate();
    }

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