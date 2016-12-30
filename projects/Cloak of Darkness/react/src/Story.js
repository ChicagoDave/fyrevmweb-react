import React, { Component } from 'react';
import { Container, Header, Input, Grid, Menu } from 'semantic-ui-react'
import { StatusLine } from '../components/StandardStatusLine.js'

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
    let storyInfo;
    if (!this.state.mainContent) {
      storyInfo = <p>Loading story</p>;
    } else {
      storyInfo = (
        <Container textAlign='center'>
          <Header as='h1'>{this.state.storyInfo.storyTitle}</Header>
          <Header as='h2'>{this.state.locationName}</Header>
          <p>{this.state.mainContent}</p>
        </Container>
      );
    }

    return (
      <div>
      <Menu>
        <Menu.Item>
          FyreVM Prototype
        </Menu.Item>
      </Menu>
      <Grid divided id='story'>
        <StatusLine props={this.fyrevm}/>
        <Grid.Row>
          <Grid.Column width={8}>
            {storyInfo}
            <br/>
            <Input fluid placeholder='Command' id='commandLine' type='text'/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
    );
  }
}

export default Story;
