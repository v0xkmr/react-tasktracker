import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import EditPost from './EditPost';
import AddPost from './AddPost';

class MainComponent extends Component {

    state = {
        name: localStorage.getItem('name'),
        id: localStorage.getItem('id')
    }

    setToken = ({ name, _id }) => {
        localStorage.setItem('name', name);
        localStorage.setItem('id', _id);
        this.setState({
            name: name,
            id: _id
        });
    }

    clearToken = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('id');
        this.setState({
            name: '',
            id: ''
        });
    }

    render() {
        return (
            <React.Fragment>
                <Navbar name={this.state.name} clearToken={this.clearToken} />
                <Switch>
                    <Route exact path="/" render={(props) => <LandingPage id={this.state.id} clearToken={this.clearToken} {...props} />} />
                    <Route path="/login" render={(props) => <Login setToken={this.setToken} {...props} />} />
                    <Route path="/register" render={(props) => <Register setToken={this.setToken} {...props} />} />
                    <Route path="/edit" render={(props) => <EditPost {...props} />} />
                    <Route path="/add" render={(props) => <AddPost {...props} />} />
                    {/* <Route path="/register" render={(props) => <Register handleToken={this.handleToken} {...props} />} /> */}
                </Switch>
            </React.Fragment>
        );
    }
}

export default MainComponent;