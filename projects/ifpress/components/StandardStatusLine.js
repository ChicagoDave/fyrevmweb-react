import React, { Component } from 'react';
import { Container, Label, Grid } from 'semantic-ui-react'

export default class StatusLine extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid.Row>
                <Grid.Column width={8}>
                    <Container textAlign='right'>
                        <Label sub>Score</Label><span>{props.score}</span>
                        <Label sub>Turn</Label><span>{props.turn}</span>
                        <Label sub>Time</Label><span>{props.time}</span>
                    </Container>
                </Grid.Column>
            </Grid.Row>
        );
    }
}
