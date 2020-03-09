import React, { Component } from 'react';
import { Input, FormFeedback } from 'reactstrap';
// import Input from '../../../components/InputControls/Input/Input';
import axios from '../../../Services/admin';
import Image from '../../../components/Image/Image';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorEmail: null,
            errorPassword: null,
        }
    }
    Login = async () => {
        const { email, password, errorEmail, errorPassword } = this.state;
        this.onChange();
        if (errorEmail == '' && errorPassword == '') {
            try {
                let response = await axios.post('/login', {
                    email,
                    password,
                });
                if (response.status == 200) {
                    localStorage.setItem('adminData', JSON.stringify(response.data.data));
                    this.props.history.push('/admin');
                } else {
                    // console.log("PARTH : TCL: Login -> Login -> response.data.data", response.data.data)
                    if(typeof response.data.data == 'string') {
                        if(response.data.data.includes('password')) {
                            this.setState({ errorPassword: response.data.data });
                        } else if(response.data.data.includes('exist')) {
                            this.setState({ errorEmail: response.data.data });
                        }
                    }
                }
            } catch (error) {
                let errorRes = error.response.data.data;
                // console.log("PARTH : TCL: Login -> Login -> errorRes", errorRes)
                if(typeof errorRes == 'string') {
                    if(errorRes.includes('Password')) {
                        this.setState({ errorPassword: errorRes });
                    } else if(errorRes.includes('exist')) {
                        this.setState({ errorEmail: errorRes });
                    }
                }

            }

        }
        // else {
        //     this.setState({ errorEmail, errorPassword });
        // }
    }

    onChange = () => {
        const { email, password } = this.state;
        let errorEmail = email.length == 0 ? 'Please enter email' : !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email) ? 'Please enter valid email' : '';
        let errorPassword = password.length == 0 ? 'Please enter password' : !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(password) ? 'Your password must be 8-15 characters long, contain 1 uppercase letter, 1 special character and a number.' : '';
        this.setState({ errorEmail, errorPassword });
    }

    render() {
        const { errorEmail, errorPassword } = this.state;
        // console.log("PARTH : TCL: Login -> render -> errorPassword", errorPassword)
        // console.log("PARTH : TCL: Login -> render -> errorEmail", errorEmail)
        return (
            <div>
                <div className="container p-41 p-41-b">
                    <div className="row d-flex justify-content-center m-50">
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 d-flex aos-item mx-auto align-items-center justify-content-center aos-init aos-animate auth-box" data-aos="fade-down">
                            <div className="m-4 text-center" style={{ width: '100%' }}>
                                <h4 className="mb-4">Admin Login</h4>
                                <div className="pos-relative">
                                    <Image
                                        src={require('../../../assets/img/msg-icon.png')}
                                        className="mb-3 pos-absolute"
                                    />
                                    <Input
                                        placeholder="Email"
                                        valid={errorEmail != null && errorEmail.length == 0}
                                        invalid={errorEmail != null && errorEmail.length != 0}
                                        onChange={(e) => {
                                            this.onChange();
                                            this.setState({ email: e.target.value });
                                        }}
                                    />
                                    <FormFeedback
                                        style={{ textAlign: 'left' }}
                                        //   valid={errorEmail != null && errorEmail.length}
                                        invalid={errorEmail != null && !errorEmail.length != 0}
                                    >
                                        {errorEmail}
                                    </FormFeedback>
                                </div>
                                <div className="pos-relative">
                                    <Image
                                        src={require('../../../assets/img/lock-img.png')}
                                        className="mb-3 pos-absolute"
                                    />
                                    <Input
                                        className="mt-3"
                                        placeholder="Password"
                                        type="password"
                                        valid={errorPassword != null && errorPassword.length == 0}
                                        invalid={errorPassword != null && errorPassword.length != 0}
                                        onChange={(e) => {
                                            this.onChange();
                                            this.setState({ password: e.target.value });
                                        }}
                                    />
                                    <FormFeedback
                                        style={{ textAlign: 'left' }}
                                        //   valid={errorPassword != null && errorPassword.length}
                                        invalid={errorPassword != null && !errorPassword.length != 0}
                                    >
                                        {errorPassword}
                                    </FormFeedback>
                                </div>
                                <button className="btn btn-primary mt-4 request_demo_send width-100" type="button" data-dismiss="modal" data-toggle="modal" onClick={this.Login}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;