import React, { Component } from 'react';
import StatusMessages from '../../_common/components/status-messages/status-messages.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import scorecardService from '../../_common/services/scorecard';
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
            upload: null
        }
    }

    /*
    * Passes uploaded file for storage in the database.
    */
    handlePublish = (event) => {
        if (this.state.upload.length > 0) {
            scorecardService.addScore(this.state.upload[0])
                .then((data) => {
                    console.log("made it through");
                    console.log(data);
                })
                .catch(() => {
                    console.log("died...");
                });
        }
    }

    render() {
        return (
            <div className="publish-scores">
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                <h2 id="title">Publish Scores</h2>
                <p><b>Please select a file below</b></p>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <FilePond
                            id="uploader"
                            name={"file"}
                            onupdatefiles={(files) => {
                                this.setState({
                                    upload:
                                        files.map(files => files.file)
                                });
                            }}
                        />
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