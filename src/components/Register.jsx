import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class Register extends Component {

    state = {
        register: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        errors: {},
        exist: ''
    }

    schema = {
        firstName: Joi.string().min(5).required(),
        lastName: Joi.string().min(5).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required()
    }

    validate = () => {
        let errors = {};
        const result = Joi.validate(this.state.register, this.schema, { abortEarly: false });
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
                const res = await axios.post('https://mighty-gorge-86571.herokuapp.com/api/customer/register', this.state.register);
                console.log(res.data);
                console.log(jwt_decode(res.data));
                this.props.setToken(jwt_decode(res.data));
                this.props.history.push('/');
            } catch (e) {
                console.log(e.response);
                if (e.response.status = 400) {
                    this.setState({ exist: e.response.data });
                }
            }
        } else {
            this.setState({ errors: errors });
        }
    };

    handleChange = (e) => {
        const register = { ...this.state.register };
        register[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ register: register });
    };

    render() {
        return (
            <div class="container mt-3">
                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <div class="card border-dark mb-3 mt-4">
                            <div class="card-body text-dark">
                                <h5 class="card-title text-center">Register</h5>
                                {this.state.exist && <div className="alert alert-danger">{this.state.exist}</div>}
                                <form>
                                    <div class="form-group">
                                        <label htmlFor="title">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            id="firstName"
                                            placeholder="First Name"
                                            onChange={this.handleChange}
                                        />
                                        {this.state.errors.firstName && <div className="alert alert-danger">{this.state.errors.firstName}</div>}
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="title">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            id="lastName"
                                            placeholder="Last Name"
                                            onChange={this.handleChange}
                                        />
                                        {this.state.errors.lastName && <div className="alert alert-danger">{this.state.errors.lastName}</div>}
                                    </div>
                                    <div class="form-group">
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
                                    <div class="form-group">
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
                                    <div class="text-center">
                                        <button type="button" class="btn btn-outline-primary" onClick={this.handleSubmit}>Register</button>
                                    </div>
                                    <div class="text-center mt-2">
                                        <strong><Link to="/login"><span>Already Registered?</span><i class="fas fa-arrow-right ml-2"></i></Link></strong>
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

export default Register;