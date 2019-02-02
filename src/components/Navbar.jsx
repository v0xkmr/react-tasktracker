import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-sm bg-light">
            <a href="#" className="navbar-brand ml-5"><i className="far fa-newspaper mr-3"></i>JotDown</a>
            <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#toggleNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="toggleNav">
                {
                    props.name ?
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item"><button type="button" class="btn btn-outline-primary"><i class="fas fa-user mr-2"></i>Hi {props.name}</button></li>
                            <li class="nav-item mx-4"><button type="button" class="btn btn-outline-primary" onClick={props.clearToken}>Logout</button></li>
                        </ul> :
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><Link to="/login" className="btn btn-outline-primary">Login</Link></li>
                            <li className="nav-item mx-4"><Link to="/register" className="btn btn-outline-primary">Register</Link></li>
                        </ul>
                }
            </div>
        </nav>
    );
}

export default Navbar;