import React, { Component } from 'react';
import { Container, Label, Grid } from 'semantic-ui-react'

export default class StatusLine extends Component {
    constructor(props) {
        super(props);
        this.state = props.fyrevm;
    }

    render() {
        return (
            <Grid.Row>
                <Grid.Column width={8}>
                    <Container textAlign='right'>
                        <Label sub>Score</Label><span>{this.state.score}</span>
                        <Label sub>Turn</Label><span>{this.state.turn}</span>
                        <Label sub>Time</Label><span>{this.state.time}</span>
                    </Container>
                </Grid.Column>
            </Grid.Row>
        );
    }
}
