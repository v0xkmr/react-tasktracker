import React, { Component } from 'react';
import axios from 'axios';

class EditPost extends Component {

    state = {
        post_id: this.props.location.post._id,
        post: {
            customerId: this.props.location.post.customerId,
            title: this.props.location.post.title,
            postBody: this.props.location.post.postBody
        }
    }

    handleChange = (e) => {
        const post = { ...this.state.post };
        post[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ post: post });
    };

    editPost = async () => {
        // console.log(`https://mighty-gorge-86571.herokuapp.com/api/post/${this.state.post_id}`);
        try {
            const res = await axios.put(`https://mighty-gorge-86571.herokuapp.com/api/post/${this.state.post_id}`, this.state.post);
            console.log(res);
            if (res.status == 200) {
                this.props.history.push('/');
            }
        }
        catch (e) {
            throw new Error(e);
        }
    }

    render() {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="card border-dark mb-3">
                            <div className="card-body text-dark">
                                <h5 className="card-title text-center">Edit Task</h5>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input
                                            type="title"
                                            className="form-control"
                                            id="title"
                                            name="title"
                                            placeholder="Title"
                                            value={this.state.post.title}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="postBody">Message</label>
                                        <textarea
                                            className="form-control"
                                            id="postBody"
                                            rows="3"
                                            name="postBody"
                                            value={this.state.post.postBody}
                                            onChange={this.handleChange}
                                        ></textarea>
                                    </div>
                                    <div className="text-center">
                                        <button type="button" className="btn btn-outline-primary" onClick={this.editPost}>Edit Task</button>
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

export default EditPost;