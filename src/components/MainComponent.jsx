import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';

class MainComponent extends Component {

    state = {
        name: 'vijay',
        id: '5c5548ce04ac240017453632'
    }

    setToken = ({ name, _id }) => {
        this.setState({
            name: name,
            id: _id
        });
    }

    render() {
        return (
            <React.Fragment>
                <Navbar name={this.state.name} />
                <Switch>
                    <Route exact path="/" render={(props) => <LandingPage id={this.state.id} {...props} />} />
                    <Route path="/login" render={(props) => <Login setToken={this.setToken} {...props} />} />
                    <Route path="/register" render={(props) => <Register setToken={this.setToken} {...props} />} />
                    {/* <Route path="/register" render={(props) => <Register handleToken={this.handleToken} {...props} />} /> */}
                </Switch>
            </React.Fragment>
        );
    }
}

export default MainComponent;