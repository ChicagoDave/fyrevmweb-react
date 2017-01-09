import React, { Component } from 'react';
import { Container, Label } from 'semantic-ui-react'

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
                <Label>Score</Label><span>{this.state.score}</span><br/><br/>
                <Label>Turn</Label><span>{this.state.turn}</span><br/><br/>
                <Label>Time</Label><span>{this.state.time}</span>
            </Container>
        );
    }
}
