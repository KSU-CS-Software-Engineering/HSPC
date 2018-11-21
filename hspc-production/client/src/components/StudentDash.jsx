import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap';

/**
 * Creates and renders the student portal. This view is available at the lowest level of authorization.
 */
export default class StudentDash extends Component{
    render(){
        return(
            <div>
                <h2>Student Portal:</h2>
                <Jumbotron>
                    <p>Student Data Coming Soon!</p>
                </Jumbotron>
            </div>
        )
    }
}