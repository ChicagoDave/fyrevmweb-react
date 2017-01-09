import React, { Component } from 'react';
import { Container, Label, Grid } from 'semantic-ui-react'

export default class StatusLine extends Component {
    constructor(props) {
        super(props);
        this.state = props.fyrevm || {
            score: 0,
            turn: 1,
            time: 0
        }
    }

    render() {
        return (
            <Container textAlign='center'>
                <Label sub>Score</Label><span>{this.state.score}</span>
                <Label sub>Turn</Label><span>{this.state.turn}</span>
                <Label sub>Time</Label><span>{this.state.time}</span>
            </Container>
        );
    }
}
