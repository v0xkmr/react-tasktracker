import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Post extends Component {
    state = {
        posts: [],
        spinner: true
    }

    async componentDidMount() {
        console.log(this.props.id);
        try {
            const res = await axios.get(`https://mighty-gorge-86571.herokuapp.com/api/post/all/${this.props.id}`);
            console.log(res.data);
            this.setState({ posts: res.data, spinner: false });
        } catch (e) {
            throw new Error(e);
        }
    }

    onDelete = async (post) => {
        const allPost = [...this.state.posts];
        const filteredPost = allPost.filter((p) => {
            return p._id != post._id;
        });
        this.setState({
            posts: filteredPost
        });
        try {
            const res = axios.delete(`https://mighty-gorge-86571.herokuapp.com/api/post/${post._id}`);
        }
        catch (e) {
            this.setState({
                posts: allPost
            });
        }
        // console.log(allPost);
    }

    render() {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <Link to={{ pathname: '/add', customerId: `${this.props.id}` }} className="btn btn-outline-primary mb-2">Create Task</Link>
                        <button type="button" class="btn btn-outline-primary d-block d-sm-none mb-2" onClick={this.props.clearToken}>Logout</button>
                        {
                            this.state.spinner ?
                                <div class="text-center">
                                    <div class="spinner-grow text-dark" role="status">
                                    </div>
                                </div>
                                :
                                <div>
                                    {
                                        this.state.posts.map((post) => {
                                            return (
                                                <div className="card border-dark mb-3">
                                                    <div className="card-header bg-transparent border-secondary">{post.title}</div>
                                                    <div className="card-body text-dark">
                                                        <h5 className="card-title">{post.postBody}</h5>
                                                    </div>
                                                    <div className="card-footer bg-transparent border-secondary text-right">
                                                        <Link to={{ pathname: '/edit', post: post, edit: this.editPost }}><strong>EDIT </strong><i className="fas fa-edit mr-5"></i></Link>
                                                        <a onClick={() => this.onDelete(post)}><strong>DELETE </strong><i className="fas fa-trash-alt mr-5"></i></a>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default Post;