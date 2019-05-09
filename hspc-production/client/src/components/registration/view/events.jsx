import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import StatusMessages from '../../../_common/components/status-messages/status-messages.jsx';
import EventService from '../../../_common/services/event';

var currentView = null;

/*
* @author: Daniel Bell
*/
export default class ViewEvents extends Component {
    constructor(props) {
        super(props);
        this.statusMessages = React.createRef();
        this.state = {
            userTable: []
        };
    }

    /*
    * Returns a list of all previous events when the component is rendered.
    */
    componentDidMount = () => {
        EventService.getAllEvents().then((response) => {
            if (response.statusCode === 200) {
                this.setState({ eventTable: JSON.parse(response.body) }, () => {
                    this.generateEventTable(); // helper function
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
  * Helper function for handleShowEvent. Generates the data as a table.
  */
    generateEventTable() {
        const events = [];
        console.log(this.state.eventTable);
        this.state.eventTable.forEach((event, index) => {
            events.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{event.EventLocation}</td>
                <td>{event.EventDate}</td>
                <td>{event.EventTime}</td>
                <td>{event.EventDescription}</td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {events}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    /*
    * Renders the component UI.
    */
    render() {
        return (
            <div>
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                {currentView}
            </div>
        );
    }
}