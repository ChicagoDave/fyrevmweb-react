import React, { Component } from 'react';
import './Story.css';

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
    console.log(fyrevm);
  }

  componentDidMount() {
    this.fyrevm.InputElement = document.getElementById('commandLine');
    this.fyrevm.OutputReady = () => this.outputReady();
    this.fyrevm.LoadStory(process.env.PUBLIC_URL + "/Cloak of Darkness.ulx");
  }

  render() {
    let storyInfo;
    if (!this.state.mainContent) {
      storyInfo = <p>Loading story</p>;
    } else {
      storyInfo = (
        <div className="Story-info">
          <div className="Story-title">
            <h1>{this.state.storyInfo.storyTitle}</h1>
          </div>
          <div className="Story-location">
            <h2>{this.state.locationName}</h2>
          </div>
          <div className="Story-mainContent">
            <p>{this.state.mainContent}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="Story">
        {storyInfo}
        <div className="Story-input">
          <input id="commandLine" type="text"/>
        </div>
      </div>
    );
  }
}

export default Story;
