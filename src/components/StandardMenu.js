import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'

export default class StatusLine extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu>
                <Menu.Item header>FyreVM Prototype</Menu.Item>
                <Dropdown as={Menu.Item} text='Stories'>
                    <Dropdown.Menu>
                        <Dropdown.Item text='Install New Story' />
                        <Dropdown.Item text='Save Story to File' />
                        <Dropdown.Item text='Start Story' />
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item name='genhelp' active={activeItem === 'genhelp'} onClick={this.handleItemClick}>Help</Menu.Item>
                <Menu.Item name='storyhelp' active={activeItem === 'storyhelp'} onClick={this.handleItemClick}>Story Help</Menu.Item>
                <Menu.Item name='storyhints' active={activeItem === 'storyhints'} onClick={this.handleItemClick}>Story Hints</Menu.Item>
                <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick}>About</Menu.Item>
            </Menu>
        );
    }
}
