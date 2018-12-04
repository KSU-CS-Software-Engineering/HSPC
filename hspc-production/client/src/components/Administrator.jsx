import React, { Component } from 'react';
import { NavLink, Router, Route } from 'react-router-dom';
import Accounts from "./Accounts";
import Metrics from "./Metrics";
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import "./Administrator.css";
// for buttons
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// for side nav
//https://reactjsexample.com/react-side-nav-component/
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


/**
 * Creates and renders the Admin portal;
 * Admins will have a unique NavBar and a sidebar 
 * to access administrative actions.
 **/
export default class Administrator extends Component{ 

    render(){
        return (

            // main div
            <div>
                {/*
                <div className="SideButtonBar">
                    <table>
                        <tr>
                            <NavLink to="/administrator/accounts">
                                <button className="SideButton">Accounts</button>
                            </NavLink>
                        </tr>
                        <br />
                        <tr>
                            <NavLink to="/administrator/metrics">
                                <button className="SideButton">Metrics</button>
                            </NavLink> 
                        </tr>
                        <br />
                        <tr>
                            <NavLink to="/administrator/metrics">
                                <button className="SideButton">New Button</button>
                            </NavLink> 
                        </tr>
                    </table>
  
                </div> 
                */}

                <div className="SideButtonGroup">
                    <div>
                        <NavLink to="/administrator/accounts">
                            <button className="SideButton">Accounts</button>
                        </NavLink>                      
                    </div>
                    <br />
                    <div>
                        <NavLink to="/administrator/metrics">
                            <button className="SideButton">Metrics</button>
                        </NavLink>                       
                    </div>
  
                </div>
                <div className="MainContent">
                    <Route path="/administrator/accounts" component={Accounts} />
                    <Route path="/administrator/metrics" component={Metrics} />
                </div>
            </div>
        )
    }//end render()
}// end class declaration