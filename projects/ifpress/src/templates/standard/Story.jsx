import React, { Component } from 'react';
import { Container, Header, Input, Grid, Menu } from 'semantic-ui-react'
import { StandardMenu } from '../../components/StandardMenu.js'
import { StatusLine } from '../../components/StandardStatusLine.js'
import { ScrollingContent } from '../../components/ScrollingContent.js'

class Story extends Component {
    constructor(props) {
        super(props);
        const FyreVMWeb = window.FyreVMWeb;
        const fyrevm = window.fyrevm;
        this.fyrevm = new FyreVMWeb.Manager();
        this.state = fyrevm;
    }

    outputReady() {
        const fyrevm = window.fyrevm;
        this.setState(fyrevm);
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
                <StandardMenu props="{this.state}"/>
                <Grid divided id='story'>
                    <StatusLine props={this.fyrevm}/>
                    <ScrollingContent props="{this.fyrevm}"/>
                </Grid>
            </div>
        );
    }
}

export default Story;
