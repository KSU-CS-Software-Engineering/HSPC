import React, { Component } from 'react';
import StatusMessages from '../../_common/components/status-messages/status-messages.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import '../../_common/assets/css/publish-files.css';

/*
* Renders the component UI.
*/
export default class PublishScores extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.state = {

        }
    }

    /*
    * Passes uploaded file for storage in the database.
    */
    handlePublish = () => {
        console.log("made it here");
        // finish
    }

    render() {
        return (
            <div className="publish-scores">
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                <h2 id="title">Publish Scores</h2>
                <p><b>Please select a file below</b></p>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <FilePond id="uploader" name={"file"} />
                        <RaisedButton
                            className="publish-button"
                            label="Publish Scorecard"
                            backgroundColor={'#00a655'}
                            labelColor={'#ffffff'}
                            onClick={(event) => this.handlePublish(event)}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}