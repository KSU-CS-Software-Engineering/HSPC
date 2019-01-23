import React, { Component } from 'react';
import { Panel, Navbar, NavItem, Nav } from 'react-bootstrap';
import userService from '../../../_common/services/user';
//import StatusMessages from '../../../_common/components/status-messages/status-messages';
import './JudgeDash.css';

export default class JudgeDash extends Component {
    constructor(props){
        super(props)
        //this.statusMessages = React.createRef(); for showing error codes
        this.state = {

        };
    }
    
    /*
    * Parent function for switching between tabs
    */
    handleChangeTab(){
        console.log(this.state.activeTab);
        switch(this.state.activeTab){
            case 'Answers':
                this.handleShowAnswers();
                break;
            case 'Teams':
                this.handleShowTeams();
                break;
            case 'Users':
                this.handleShowUsers();
                break;
            default:
                console.log("error occurred");
        }
    }


    /*
    * Returns a list of questions and answers.
    */
    handleShowAnswers(){
        
        // finish
    }

    /*
    * Returns a list of teams competing in the current event.
    */
    handleShowTeams(){
        
        // finish
    }

    /*
    * Returns a list of all registered users.
    */
    handleShowUsers(){
        userService.getAllUsers().then((response) => {
            if (response.statusCode === 200) {
                alert(response);
                // render user list
                // fix 404 error
            }
        })
    }

    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>Judge Portal</Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem 
                                onClick={this.handleShowAnswers}
                                eventKey={1}>
                                Answers
                            </NavItem>

                            <NavItem 
                                onClick={this.handleShowTeams}
                                eventKey={2}>
                                Teams
                            </NavItem>
                            
                            <NavItem 
                                onClick={this.handleShowUsers}
                                eventKey={3}>
                                Users
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Panel className="page-body">
                    <p>Comming soon</p>
                </Panel>  
            </div>
        )
    }
}