import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class Login extends Component {

    state = {
        login: {
            email: '',
            password: '',
        },
        errors: {},
        doesNotExist: ''
    }

    schema = {
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required()
    }

    validate = () => {
        let errors = {};
        const result = Joi.validate(this.state.login, this.schema, { abortEarly: false });
        if (!result.error) {
            return errors;
        }
        //for of let us iterate thorugh a collection like array
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message
        }
        return errors;
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const errors = this.validate();
        if (Object.keys(errors).length === 0) {
            try {
                const res = await axios.post('https://mighty-gorge-86571.herokuapp.com/api/customer/login', this.state.login);
                console.log(res.data);
                console.log(jwt_decode(res.data));
                this.props.setToken(jwt_decode(res.data));
            } catch (e) {
                console.log(e.response);
                if (e.response.status = 400) {
                    this.setState({ doesNotExist: e.response.data });
                }
            }
        } else {
            this.setState({ errors: errors });
        }
    };

    handleChange = (e) => {
        const login = { ...this.state.login };
        login[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ login: login });
    };

    render() {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="card border-dark mb-3 mt-5">
                            <div className="card-body text-dark">
                                <h5 className="card-title text-center">Login</h5>
                                {this.state.doesNotExist && <div className="alert alert-danger">{this.state.doesNotExist}</div>}
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="title">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            id="email"
                                            placeholder="Email Address"
                                            onChange={this.handleChange}
                                        />
                                        {this.state.errors.email && <div className="alert alert-danger">{this.state.errors.email}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="title">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            onChange={this.handleChange}
                                        />
                                        {this.state.errors.password && <div className="alert alert-danger">{this.state.errors.password}</div>}
                                    </div>
                                    <div className="text-center">
                                        <button type="button" className="btn btn-outline-primary" onClick={this.handleSubmit}>Log in</button>
                                    </div>
                                    <div className="text-center mt-2">
                                        <strong><Link to="/register"><span>Create new account?</span><i className="fas fa-arrow-right ml-2"></i></Link></strong>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;