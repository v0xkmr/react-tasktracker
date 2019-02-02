import React, { Component } from 'react';

class LandingPage extends Component {
    render() {
        console.log(this.props.id);
        const content = this.props.id ?
            'hey'
            : (
                <div className="mainbody">
                    <div className="maintext">
                        <div className="display-3"><span className="jot">JOT</span><span className="down ml-2">DOWN</span></div>
                        <h3>Lets you work more collaboratively and get more done.</h3>
                        <button type="button" className="btn btn-outline-primary centerbutton">Start Here<i className="fas fa-arrow-right ml-2"></i></button>
                    </div>
                </div>
            );
        return content;
    }
}

export default LandingPage;