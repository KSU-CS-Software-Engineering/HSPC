import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';


export default class Accounts extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <Jumbotron>
                        <h2>Manage Accounts</h2>
                    </Jumbotron>
                </Grid>               
            </div>
        )
    }
}