import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Checkbox } from 'react-bootstrap';

var createHistory = require('history').createBrowserHistory;
const history = createHistory({
    forceRefresh: true
})

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:{
                Username: '',
                Password: '',
            },
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        })
    }

    handleSubmit(e) {
        const { user } = this.state;
        e.preventDefault();
        // const username = encodeURIComponent(Username);
        // const password = encodeURIComponent(Password);
        // const formData = `Username=${username}&password=${password}`;
        // console.log('formData', formData)
        // // create an AJAX request
        // const xhr = new XMLHttpRequest();
        // xhr.open('POST', '/auth/login');
        // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // xhr.responseType = 'json';
        // xhr.addEventListener('load', () => {
        //     if (xhr.status === 200) {
        //         this.setState({
        //             errors: {}
        //         });
        //         console.log('The form is valid');
        //         history.push('/dashboard');
        //     } else {
        //         console.log('xhr', xhr)
        //         // const errors = xhr.response.errors ? xhr.response.errors : {};
        //         // errors.summary = xhr.response.message;
        //         // this.setState({
        //         //     errors
        //         // });
        //     }
        // });
        // xhr.send(formData);
        fetch('http://localhost:5000/login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               Username: user.Username,
               Password: user.Password
            }),
        })
        // .then((res) => res.json())
        //     .then((result) => {
        //         console.log('login::', result)
        //         // this.setState({ data: [result.todo, ...data], todo: { ...defaultTodo } })
        //     })
    }

    render() {
        // const { Username, Password } = this.state;
        return (
            <div>
                <div className="bg-img" />
                <div className="container">
                    <form >
                        <h2>Login Page</h2>

                        <FormGroup>
                            <ControlLabel style={{ paddingRight: '330px' }} >Username: </ControlLabel>
                            <FormControl className="form-control" name="Username" type="text" placeholder="Please Enter Username Here..." onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel style={{ paddingRight: '330px' }}>Password: </ControlLabel>
                            <FormControl className="form-control" name="Password" type="password" placeholder="Please Enter Password Here..." onChange={this.handleChange} />
                        </FormGroup>

                        <Checkbox style={{ paddingRight: '250px' }} >Remember me</Checkbox>

                        <Button type="submit" className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit}>Submit</Button>
                        <p>Not register yet?</p> <a href="/register">Register Here</a>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;