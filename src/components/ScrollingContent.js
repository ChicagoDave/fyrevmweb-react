/**
 * Created by david.cornelson on 12/29/2016.
 *
 * Generate all turns into scrolling content with <EmbeddedCommandLine/> at the bottom and
 * force scroll to bottom always.
 *
 * story.locationName should be placed bold before mainContent.
 *
 */

import React, { Component } from 'react';
import { Container, Input } from 'semantic-ui-react'

export default class ScrollingContent extends Component {
    componentDidUpdate() {
      // Scroll content to the bottom when there's new output
      var element = document.getElementsByClassName('story-scroll')[0];
      element.scrollTop = element.scrollHeight;
    }

    render() {
        // Story and input are two parallel arrays
        var history = [];
        for (var i = 0; i < this.props.input.length; i++) {
            var story = this.props.story[i];
            var input = this.props.input[i];
            history.push(<p key={"story-" + i}>{story}</p>);
            history.push(<p key={"input-" + i}><strong>{input}</strong></p>);
        }
        var lastStory = this.props.story[this.props.input.length];
        history.push(<p key={"story-" + this.props.input.length}>{lastStory}</p>);

        return (
            <div className='story-content'>
                <Container className='story-scroll'>
                    {history}
                </Container>
                <br/>
                <Container className='story-input'>
                    <Input fluid placeholder='Command' id='commandLine' type='text'/>
                </Container>
            </div>
        );
    }
}
