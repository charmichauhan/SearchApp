import React, { Component } from 'react';
import { DropdownButton, MenuItem, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

class MarriageDetails extends Component {

    renderDropdownButton() {
        return (
            <DropdownButton
                title="Search By"
                id={Date.now()}
            >
                <MenuItem eventKey="1" active >FullName</MenuItem>
                <MenuItem eventKey="2">Address</MenuItem>
            </DropdownButton>
        );
    }

    render() {
        return (
            <div style={{ marginLeft: '600px' }}>
                {this.renderDropdownButton()}
                <br /><br />

            </div>
        );
    }
}

export default MarriageDetails;