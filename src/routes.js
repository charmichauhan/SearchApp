import React, { Component } from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard/index';
import ProfileRegistration from './components/Dashboard/ProfileRegistration';
import MemberDetails from './components/Dashboard/MemberDetails';
import MarriageDetails from './components/Dashboard/MarriageDetails';
import EditProfile from './components/Dashboard/EditProfile';

class Routes extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/profileReg" component={ProfileRegistration} />
                    <Route path="/member" component={MemberDetails} />
                    <Route path="/marriage" component={MarriageDetails} />
                    <Route path="/editProfile" component={EditProfile} />
                </Route>
            </Router>
        )
    }
}

export default Routes;