import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import './Home.css';

export default class Home extends Component {
    
    /*************************************************************************************
     * Renders the component UI.
    *************************************************************************************/
    render() {
        return (
            <div>
            <Jumbotron>
                <h2>Welcome to Kansas State University!</h2>
                <p>Site Under Construction</p>
            </Jumbotron>
            </div>
        )
    }
}