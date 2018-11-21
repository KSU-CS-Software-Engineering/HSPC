import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap';

/**
 * Creates and renders a scoreboards of teams and their ranking. This is viewable upon completion.
 */
export default class Scoreboard extends Component{
    render(){
        return(
            <div>
                <h2>Scoreboard:</h2>
                <Jumbotron>
                    <p>Scoreboard Coming Soon.</p>
                </Jumbotron>
            </div>
        )
    }
}