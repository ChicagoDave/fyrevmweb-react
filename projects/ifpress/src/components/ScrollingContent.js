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
import { Container, Header, Input } from 'semantic-ui-react'

export default class ScrollingContent extends Component {
    render() {
        return (
            <div>
              <Container textAlign='center'>
                <Header as='h1'>{this.props.title}</Header>
                <Header as='h2'>{this.props.location}</Header>
                <p>{this.props.content}</p>
              </Container>
                <br/>
                <Input fluid placeholder='Command' id='commandLine' type='text'/>
            </div>
        );
    }
}
