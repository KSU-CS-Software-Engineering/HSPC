import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
//import StatusMessages from '../../../_common/components/status-messages/status-messages';
import userService from '../../../_common/services/user';
import './AdminDash.css';

export default class AdminDash extends Component {
    constructor(props){
        super(props)
        //this.statusMessages = React.createRef(); for showing error codes
        this.state = {}
    }
    
    handleShowUsers(event){
        userService.getAllUsers().then((response) => {
            if (response.statusCode === 200) {

                alert(response);
                // render user list
                // fix 404 error
            
            }
        })
    }

    handleShowScore(event){
        this.props.history.push('../scoreboard/Scoreboard');
    }
    
    render() {
        return (
            <div>
                <Navbar className="subnav">
                    <Navbar.Header>
                        <Navbar.Brand className="admin_brand">
                            <h1>Admin Portal</h1>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        
                    </Navbar.Header>
                    <Navbar.Collapse className="content_ribbon">
                        <Navbar.Text pullRight className="buttonlist">
                            <Button 
                                className = "PendingRequests"
                                bsStyle='info'
                                >Pending Requests
                                </Button>
                            <Button 
                                className = "CreateTeam"
                                bsStyle='info'
                                >Create Team
                                </Button>
                            <Button 
                                className = "ShowUsers"
                                bsStyle='info'
                                onClick={(event) => this.handleShowUsers(event)}
                                >View Users
                                </Button>
                            <Button 
                                className = "History"
                                bsStyle='info'
                                >History
                                </Button>
                            <Button 
                                className = "ShowScoreboard"
                                bsStyle='success'
                                onClick={(event) => this.handleShowScore(event)}
                                >Show Scoreboard
                                </Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>;
            </div>
        )
    }
}