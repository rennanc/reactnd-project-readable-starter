import React, { Component } from "react";
import { connect } from "react-redux";
import { handleCreateComment } from '../actions/comments'
import { Redirect, withRouter } from "react-router-dom";
import { browserHistory } from 'react-router'
import { generateUID } from '../utils/helpers'

class NewComment extends Component{

    state = {
        comment : {
            title: '',
            body: '',
            parentId: this.props.match.params.postId,
            author: 'rennanc',
            id: generateUID(),
        },
        toHome: false,
    }


    handleChangeBody = (e) => {
        const body = e.target.value

        this.setState((prevState) => ({
            comment: {
                ...prevState.comment,
                body: body
            }
        }))
    }

    handleChangeTitle = (e) => {
        const title = e.target.value

        this.setState((prevState) => ({
            comment : {
                ...prevState.comment,
                title : title
            }
        }))
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch, id } = this.props

        const { comment } = this.state

        dispatch(handleCreateComment(id, comment))

        this.setState(() => ({
            comment: comment,
           toHome: id ? false : true,
        }))
    }

        
    render() {
        const { comment, toHome } = this.state

        if(toHome === true){
            const redirectUrl = this.props.location.pathname.replace('/newComment','')
            return <Redirect to={redirectUrl} />
        }

        return (
        <div className="newComment ">
            <form className="form-group" onSubmit={this.handleSubmit}>
                <fieldset >
                    <legend>New Comment</legend>
                    <div className="form-row ">
                        <textarea 
                            value={comment.body}
                            className="form-control col"
                            onChange={this.handleChangeBody}
                            id="postFormTextArea"
                            rows="8"
                            placeholder="Write a New Post"
                            required
                            />
                    </div>
                    <hr/>
                    <button 
                    type="submit"
                    className="btn btn-primary"
                    disabled={comment.body === ''}>Comment</button>
                </fieldset>
             </form>
        </div>
        )
    }
}

export default withRouter(connect()(NewComment));