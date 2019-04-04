import React, { Component } from 'react';
import '../_common/assets/css/question-button.css';

const types = [
    {
        text: 'Incorrect',
        class: 'answer-red',
        pointsAdded: -1
    },
    {
        text: 'Correct',
        class: 'answer-yellow',
        pointsAdded: 0.5
    },
    {
        text: 'Correct',
        class: 'answer-green',
        pointsAdded: 0.5
    }
];

export default class ScoreboardTile extends Component {
    constructor(props) {
        super(props);
        this.questionNum = this.props.questionNum;
        this.teamID = this.props.teamID;
        this.timesClicked = this.props.timesClicked;
        this.pointsAdded = this.props.pointsAdded;
        this.state = {
            type: types[this.timesClicked]
        };
    }

    render() {
        return (
            <div className={this.state.type.class} id="tiles" key={this.key}>
                Question {this.props.questionNum+1}<br />{this.state.type.text}
            </div>
        );
    }
}