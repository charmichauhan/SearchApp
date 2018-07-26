import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

var createHistory = require('history').createBrowserHistory;
const history = createHistory({
    forceRefresh: true
})

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            User: {
                Username: '',
                Email: '',
                Password: ''
            },
            errorMessageField: {
                Username: '',
                Email: '',
                Password: ''
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.resetForm = this.resetForm.bind(this)
    }

    checkFormField(name, value) {
        let { errorMessageField } = this.state;
        switch (name) {
            case 'Username':
                let usernameValid = value.match(/^[a-zA-Z]+$/);
                errorMessageField.Username = !value || !usernameValid || value.length < 2 ? 'Please enter valid name' : ''
                break;
            case 'Email':
                if (value.length === 0) {
                    errorMessageField.Email = ''
                }
                else {
                    let emailValid = (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value);
                    errorMessageField.Email = !value || !emailValid ? 'Please enter valid email' : ''
                }
                break;
            case 'Password':
                let pwdValid = (/^[A-Z0-9]+$/);
                errorMessageField.Password = !value || !pwdValid || value.length < 5 ? 'Please enter valid password' : ''
                break;
            default:
                break;
        }
        this.setState({ errorMessageField });
        return errorMessageField;
    }

    formIsValid() {
        let { User, errorMessageField } = this.state;
        errorMessageField = this.checkFormField('Username', User.Username);
        errorMessageField = this.checkFormField('Email', User.Email);
        errorMessageField = this.checkFormField('Password', User.Password);
        this.setState({ errorMessageField });
        return Object.keys(errorMessageField).every(x => !errorMessageField[x]);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { User } = this.state;
        this.setState({
            User: {
                ...User,
                [name]: value
            }
        },
            // () => this.checkFormField(name, value)
        );
    }

    resetForm() {
        this.myForm.reset();
    }

    handleSubmit(e) {
        const { User } = this.state;
        e.preventDefault();
        if (this.formIsValid()) {
            // POST data
            fetch('http://localhost:5000/register/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: User.Username,
                    Email: User.Email,
                    Password: User.Password
                })
            })
            // .then((res) => res.json())
            //     .then((result) => {
            //         console.log('result::', result)
            //         // this.setState({ data: [result.tozzzdo, ...data], todo: { ...defaultTodo } })
            //     })
            // history.push('/dashboard');
        }
    }

    render() {
        const { errorMessageField } = this.state;
        return (
            <div>
                <div className="bg-img" />
                <div className="container">
                    <form onSubmit={this.handleSubmit} ref={(el) => this.myForm = el}>
                        <h2>Registration Page</h2>

                        <FormGroup>
                            <ControlLabel style={{ paddingRight: '330px', paddingTop: '10px' }}>Username: </ControlLabel>
                            <div className={errorMessageField.Username && errorMessageField.Username.length > 0 ? 'error' : ''}>
                                <FormControl required="true" className="form-control" name="Username" type="text" placeholder="Please Enter Username Here..." onChange={this.handleChange} />
                            </div>
                            {errorMessageField.Username && errorMessageField.Username.length > 0 ? <span style={{ color: 'red', paddingRight: '220px' }}>{errorMessageField.Username}</span> : ""}
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel style={{ paddingRight: '330px', paddingTop: '10px' }}>Email: </ControlLabel>
                            <div className={errorMessageField.Email && errorMessageField.Email.length > 0 ? 'error' : ''}>
                                <FormControl className="form-control" name="Email" type="email" placeholder="Please Enter Email Here..." onChange={this.handleChange} />
                            </div>
                            {errorMessageField.Email && errorMessageField.Email.length > 0 ? <span style={{ color: 'red', paddingRight: '220px' }}>{errorMessageField.Email}</span> : ""}
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel style={{ paddingRight: '330px', paddingTop: '10px' }}>Password: </ControlLabel>
                            <div className={errorMessageField.Password && errorMessageField.Password.length > 0 ? 'error' : ''}>
                                <FormControl required="true" className="form-control" name="Password" type="password" placeholder="Please Enter Password Here..." onChange={this.handleChange} />
                            </div>
                            {errorMessageField.Password && errorMessageField.Password.length > 0 ? <span style={{ color: 'red', paddingRight: '190px' }}>{errorMessageField.Password}</span> : ""}
                        </FormGroup>

                        <br />
                        <Button type="submit" className="btn btn-lg btn-primary btn-block" >Register</Button>
                        <Button className="btn btn-secondary btn-block" onClick={this.resetForm}>Reset</Button>

                        <p>Already registered?</p>
                        <a href="/">Login In Here</a>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;