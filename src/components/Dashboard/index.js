import React, { Component } from 'react';
import { DropdownButton, MenuItem, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { Link } from 'react-router';

var createHistory = require('history').createBrowserHistory;
const history = createHistory({
    forceRefresh: true
})

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user: [],
            isPaneOpen: true,
            isPaneOpenLeft: true,
        }
    }

    componentDidMount() {
        this.setState({ isPaneOpen: true });
        fetch('http://localhost:5000/register/')
            .then((res) => res.json())
            .then((result) => {
                console.log('result', result)
                this.setState({ data: result });
            })
    }

    getUser(_id) {
        fetch('http://localhost:5000/register/' + _id)
            .then((res) => res.json())
            .then((result) => {
                console.log('user', result)
                // this.setState({ user: result });
            })
    }

    render() {
        const { data, user } = this.state;
        console.log('data', data)
        return (
            <div style={{ marginLeft: '600px' }}>

                <SlidingPane
                    ariaHideApp={false}                    
                    isOpen={this.state.isPaneOpenLeft}
                    title='Menu Pane'
                    from='left'
                    width='240px'
                    onRequestClose={() => this.setState({ isPaneOpenLeft: false })}
                >
                    <div className="sidebar">
                        <br /><br />
                        <Link to="/profileReg">Profile Registration</Link>
                        <br /><br />
                        <Link to="/member">Member Details</Link>
                        <br /><br />
                        <Link to="/marriage">Marriage Details</Link>
                        <br /><br />
                        <Link to="/editProfile">Edit Profile</Link>
                        <br /><br />
                        <Link to="/">Logout</Link>
                        <br /><br />
                    </div>
                </SlidingPane>
                <div>
                    <img
                        className="image"
                        style={{ left: '0px', top: '0px' }}
                        onClick={() => this.setState({ isPaneOpenLeft: !this.state.isPaneOpenLeft })}
                        // src="http://mhfwellness.org/assets/website/menu-toggle.png"
                        src="../../images/download.png"
                        alt="Open Sidebar"
                    />
                </div>
                {data.map((user, index) =>
                    <div key={user._id}>
                        {this.getUser(user._id)}
                    </div>
                )}
                {/* <h2 style={{ marginRight: '600px' }}> Welcome {user.Username}!! </h2>  */}
            </div>
        );
    }
}

export default Dashboard;