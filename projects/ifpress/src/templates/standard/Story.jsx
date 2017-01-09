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
            mainContent: 'Loading story'
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
        console.log(fyrevm);
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
                <Grid divided id="story">
                    <Grid.Column width={4}>
                        <StatusLine
                            score={this.state.score}
                            turn={this.state.turn}
                            time={this.state.time}/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <ScrollingContent
                            title={this.state.storyInfo.storyTitle}
                            location={this.state.locationName}
                            content={this.state.mainContent}/>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Story;
