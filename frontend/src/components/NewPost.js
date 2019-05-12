import React, { Component } from "react";
import { connect } from "react-redux";
import { handleCreatePost } from '../actions/posts'
import { Redirect } from "react-router-dom";
import { generateUID } from '../utils/helpers'

class NewPost extends Component{

    state = {
        post : {
            title: '',
            body: '',
            category: this.props.match.params.category,
            author: 'rennanc',
            id: generateUID(),
        },
        toHome: false,
    }


    handleChangeBody = (e) => {
        const body = e.target.value

        this.setState((prevState) => ({
            post: {
                ...prevState.post,
                body: body
            }
        }))
    }

    handleChangeTitle = (e) => {
        const title = e.target.value

        this.setState((prevState) => ({
            post : {
                ...prevState.post,
                title : title
            }
        }))
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch, id } = this.props

        const { post } = this.state

        dispatch(handleCreatePost(id, post))

        this.setState(() => ({
            post: post,
           toHome: id ? false : true,
        }))
    }

        
    render() {
        const { post, toHome } = this.state

        if(toHome === true){
            return <Redirect to='/' />
        }

        return (
        <div className="newPost ">
            <form className="form-group" onSubmit={this.handleSubmit}>
                <fieldset >
                    <legend>New Post</legend>
                    <div className="form-row">
                        <input 
                            value={post.title}
                            onChange={this.handleChangeTitle}
                            id="newPostTitle"
                            placeholder="Title"
                            className="col form-control form-control-lg"
                            required
                        />
                    </div>
                    <div className="form-row ">
                        <textarea 
                            value={post.body}
                            className="form-control col"
                            onChange={this.handleChangeBody}
                            id="newPostTextArea"
                            rows="8"
                            placeholder="Write a New Post"
                            required
                            />
                    </div>
                    <hr/>
                    <button 
                    type="submit"
                    className="btn btn-primary"
                    disabled={post.body === '' && post.title === ''}>Post</button>
                </fieldset>
             </form>
        </div>
        )
    }
}

export default connect()(NewPost);