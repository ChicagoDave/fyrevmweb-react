import React, { Component } from 'react';
import { Container, Grid, Header, Label } from 'semantic-ui-react'

export default class StatusLine extends Component {
    render() {
        return (
            <Container>
                <Header as='h1' textAlign='center'>{this.props.title}</Header>
                <Grid color='grey'>
                    <Grid.Column width={8}>
                        <Header>{this.props.location}</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Label>Score</Label><span>{this.props.score}</span>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Label>Turn</Label><span>{this.props.turn}</span>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Label>Time</Label><span>{this.props.time}</span>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}
