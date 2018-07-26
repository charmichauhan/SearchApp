import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
var createHistory = require('history').createBrowserHistory;
const history = createHistory({
    forceRefresh: true
})

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            errorMessageField: {
                FullName: '',
                Fathers_Name: '',
                Age: '',
                Address: '',
                Occupation: '',
                Marital_Status: ''
            }
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/profile/')
            .then((res) => res.json())
            .then((result) => {
                console.log('result', result)
                this.setState({ data: result });
            })
    }

    checkFormField(name, value) {
        let { errorMessageField } = this.state;
        switch (name) {
            case 'FullName':
                let fullnameValid = value.match(/^[a-zA-Z]+$/);
                errorMessageField.FullName = !value || !fullnameValid || value.length < 2 ? 'Please enter valid fullname' : ''
                break;
            case 'Fathers_Name':
                let fathersnameValid = value.match(/^[a-zA-Z]+$/);
                errorMessageField.Fathers_Name = !value || !fathersnameValid || value.length < 2 ? 'Please enter valid fathers_name' : ''
                break;
            case 'Age':
                let ageValid = value.match(/^[0-9]+$/);
                errorMessageField.Age = !value || !ageValid ? 'Please enter valid age' : ''
                break;
            case 'Address':
                let addressValid = value.match(/^[a-zA-Z]+$/);
                errorMessageField.Address = !value || !addressValid || value.length < 5 ? 'Please enter valid address' : ''
                break;
            case 'Occupation':
                if (value.length === 0) {
                    errorMessageField.Occupation = ''
                }
                else {
                    let occupationValid = (/^[a-zA-Z]+$/);
                    errorMessageField.Occupation = !value || !occupationValid ? 'Please enter valid occupation' : ''
                }
                break;
            default:
                break;
        }
        this.setState({ errorMessageField });
        return errorMessageField;
    }

    formIsValid() {
        let { User, errorMessageField } = this.state;
        errorMessageField = this.checkFormField('FullName', User.FullName);
        errorMessageField = this.checkFormField('Fathers_Name', User.Fathers_Name);
        errorMessageField = this.checkFormField('Age', User.Age);
        errorMessageField = this.checkFormField('Address', User.Address);
        errorMessageField = this.checkFormField('Occupation', User.Occupation);
        this.setState({ errorMessageField });
        return Object.keys(errorMessageField).every(x => !errorMessageField[x]);
    }
    
    handleUser(_id) {
        console.log('_id', _id)
        fetch('http://localhost:5000/profile/' + _id)
            .then((res) => res.json())
            .then((result) => {
                console.log('handleuser', result)
                // this.setState({ data: result });
            })
    }

    handleSubmit() {
        history.push('/dashboard');
    }

    render() {
        const { errorMessageField, data } = this.state;
        console.log('data::::', data)

        return (
            <div style={{ paddingTop: '20px' }} className="regProfile-container" >
                <div className="register-profile">
                    <h2>Edit your profile here... </h2>
                    <form onSubmit={this.handleSubmit}>

                        <FormGroup>
                            <ControlLabel style={{ paddingRight: '1000px', paddingTop: '10px' }} >FullName: </ControlLabel>
                            <div className={errorMessageField.FullName && errorMessageField.FullName.length > 0 ? 'error' : ''}>
                                <FormControl required="true" className="form-control" name="FullName" type="text" value={data.FullName} placeholder="Please Enter FullName Here..." onChange={this.handleChange} />
                            </div>
                            {errorMessageField.Username && errorMessageField.Username.length > 0 ? <span style={{ color: 'red', paddingRight: '220px' }}>{errorMessageField.FullName}</span> : ""}
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel style={{ paddingRight: '1000px', paddingTop: '10px' }}>Fathers_Name: </ControlLabel>
                            <div className={errorMessageField.Fathers_Name && errorMessageField.Fathers_Name.length > 0 ? 'error' : ''}>
                                <FormControl required="true" className="form-control" name="Fathers_Name" type="text" placeholder="Please Enter Fathers_Name Here..." onChange={this.handleChange} />
                            </div>
                            {errorMessageField.Fathers_Name && errorMessageField.Fathers_Name.length > 0 ? <span style={{ color: 'red', paddingRight: '200px' }}>{errorMessageField.Fathers_Name}</span> : ""}
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel style={{ paddingRight: '1000px', paddingTop: '10px' }}>Age: </ControlLabel>
                            <div className={errorMessageField.Age && errorMessageField.Age.length > 0 ? 'error' : ''}>
                                <FormControl required="true" className="form-control" name="Age" type="number" placeholder="Please Enter Age Here..." onChange={this.handleChange} />
                            </div>
                            {errorMessageField.Age && errorMessageField.Age.length > 0 ? <span style={{ color: 'red', paddingRight: '220px' }}>{errorMessageField.Age}</span> : ""}
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel style={{ paddingRight: '1000px', paddingTop: '10px' }}>Address: </ControlLabel>
                            <div className={errorMessageField.Address && errorMessageField.Address.length > 0 ? 'error' : ''}>
                                <FormControl required="true" className="form-control" name="Address" type="text" placeholder="Please Enter Address Here..." onChange={this.handleChange} />
                            </div>
                            {errorMessageField.Address && errorMessageField.Address.length > 0 ? <span style={{ color: 'red', paddingRight: '190px' }}>{errorMessageField.Address}</span> : ""}
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel style={{ paddingRight: '1000px', paddingTop: '10px' }}>Occupation: </ControlLabel>
                            <div className={errorMessageField.Occupation && errorMessageField.Occupation.length > 0 ? 'error' : ''}>
                                <FormControl className="form-control" name="Occupation" type="text" placeholder="Please Enter Occupation Here..." onChange={this.handleChange} />
                            </div>
                            {errorMessageField.Occupation && errorMessageField.Occupation.length > 0 ? <span style={{ color: 'red', paddingRight: '190px' }}>{errorMessageField.Occupation}</span> : ""}
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel style={{ paddingRight: '1000px', paddingTop: '10px' }}>Marital_Status: </ControlLabel>
                            <div className={errorMessageField.Marital_Status && errorMessageField.Marital_Status.length > 0 ? 'error' : ''}>
                                <FormControl required="true" className="form-control" name="Marital_Status" type="text" placeholder="Please Enter Marital_Status Here..." onChange={this.handleChange} />
                            </div>
                            {errorMessageField.Marital_Status && errorMessageField.Marital_Status.length > 0 ? <span style={{ color: 'red', paddingRight: '190px' }}>{errorMessageField.Marital_Status}</span> : ""}
                        </FormGroup>
                        <br />

                        <Button type="submit" className="btn btn-lg btn-primary btn-block">Update</Button>
                    </form>
                </div>
                {data.map((user, index) =>
                    <div key={user._id}>
                        {this.handleUser(user._id)}
                    </div>
                )}
            </div>
        );
    }
}

export default EditProfile;