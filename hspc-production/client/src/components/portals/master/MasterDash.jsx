import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
//import StatusMessages from '../../../_common/components/status-messages/status-messages';
import './MasterDash.css'

export default class MasterDash extends Component {
    constructor(props){
        super(props)
        //this.statusMessages = React.createRef(); for showing error codes
        this.state = {}
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
                                >Show Scoreboard
                                </Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>;
            </div>
        )
    }
}