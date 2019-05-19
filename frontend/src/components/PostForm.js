import React, { Component } from "react";
import { connect } from "react-redux";
import { handleCreatePost } from '../actions/posts'
import { Redirect } from "react-router-dom";

class PostForm extends Component{

    state = {
        post : {
            title: '',
            body: '',
            category: this.props.match.params.category,
        },
        isEdit: false,
        toHome: false,
    }

    componentDidMount() {
        const { post } = this.props
        const { postId, category } = this.props.match.params
        if(postId != null && post != null){
            this.setState(() => ({
                post: post,
                isEdit: true
            }))
        }else{
            this.setState((prevState) => ({
                post: {
                    ...prevState.post,
                    category: category
                }
            }))
        }
    }

    getIntentTitle(){
        const { isEdit } = this.state
        var title = 'New Post'
        if(isEdit){
            title = 'Edit Post'
        }
        return (
            <legend>{title}</legend>
        )
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
        <div className="postForm ">
            <form className="form-group" onSubmit={this.handleSubmit}>
                <fieldset >
                    {this.getIntentTitle()}
                    <div className="form-row">
                        <input 
                            controlled="true"
                            value={post.title}
                            onChange={this.handleChangeTitle}
                            id="postFormTitle"
                            placeholder="Title"
                            className="col form-control form-control-lg"
                            required
                        />
                    </div>
                    <div className="form-row ">
                        <textarea 
                            controlled="true"
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
                    disabled={post.body === '' || post.title === ''}>Post</button>
                </fieldset>
             </form>
        </div>
        )
    }
}


function mapStateToProps({ posts }, router) {
 
    if(posts != null){
      return {
        post: Object.values(posts).filter((p) =>  p.id === router.match.params.postId).shift(),
      }
    }
    return {}
  }

export default connect(mapStateToProps)(PostForm);