import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import './Home.css';

export default class Home extends Component{
    render(){
        return(
            <Grid>
                <Jumbotron>
                    <h2>Welcome to Kansas State University!</h2>
                    <p>Site Under Construction</p>
                </Jumbotron>
            </Grid>
        )
    }
}