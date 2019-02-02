import React, { Component } from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
    render() {
        // console.log(this.props.id);
        const content = this.props.id ?
            <Post id={this.props.id} clearToken={this.props.clearToken} />
            : (
                <div className="mainbody">
                    <div className="maintext">
                        <div className="display-3"><span className="jot">JOT</span><span className="down ml-2">DOWN</span></div>
                        <h3>Lets you work more collaboratively and get more done.</h3>
                        <Link to="/login" className="btn btn-outline-primary centerbutton">Start Here<i className="fas fa-arrow-right ml-2"></i></Link>
                    </div>
                </div>
            );
        return content;
    }
}

export default LandingPage;