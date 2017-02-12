import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import StandardMenu from '../../components/StandardMenu.js'
import StatusLine from '../../components/StandardStatusLine.js'
import ScrollingContent from '../../components/ScrollingContent.js'

class Story extends Component {
    constructor(props) {
        super(props);
        const FyreVMWeb = window.FyreVMWeb;
        this.fyrevm = new FyreVMWeb.Manager();
        this.defaults = {
            score: 0,
            turn: 1,
            time: 0,
            storyInfo: { storyTitle: '' },
            locationName: '',
            mainContent: 'Loading story',
            storyHistory: [],
            inputHistory: [],
        };
        this.state = this.defaults;
    }

    outputReady() {
        const fyrevm = window.fyrevm;
        if (!fyrevm.mainContent) {
            this.setState(this.defaults);
        } else {
            this.setState(fyrevm);
        }
        this.fyrevm.InputElement.value = '';
    }

    componentDidMount() {
        this.fyrevm.InputElement = document.getElementById('commandLine').firstChild;
        this.fyrevm.OutputReady = () => this.outputReady();
        this.fyrevm.LoadStory(process.env.PUBLIC_URL + '/Cloak of Darkness.ulx');
    }

    render() {
        return (
            <div>
                <StandardMenu/>
                <Grid id="story">
                    <Grid.Column width={4}/>
                    <Grid.Column width={8}>
                        <StatusLine
                            title={this.state.storyInfo.storyTitle}
                            location={this.state.locationName}
                            score={this.state.score}
                            turn={this.state.turn}
                            time={this.state.time}/>
                        <br/>
                        <ScrollingContent
                            story={this.state.storyHistory}
                            input={this.state.inputHistory}/>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Story;
