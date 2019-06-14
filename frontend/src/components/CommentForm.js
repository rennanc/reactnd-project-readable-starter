import React, { Component } from "react";
import { connect } from "react-redux";
import { handleCreateComment, handleUpdateComment } from '../actions/comments'
import { Redirect, withRouter } from "react-router-dom";

class CommentForm extends Component{

    state = {
        comment : {
            title: '',
            body: '',
            parentId: this.props.match.params.postId,
        },
        isEdit: false,
        toHome: false,
    }

    componentDidMount() {
        const { comment } = this.props
        const { commentId, postId } = this.props.match.params
        if(commentId != null && comment != null && postId != null){
            this.setState(() => ({
                comment: comment,
                isEdit: true
            }))
        }else{
            this.setState((prevState) => ({
                comment: {
                    ...prevState.comment,
                    parentId: postId
                }
            }))
        }
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

    getIntentTitle(){
        const { isEdit } = this.state
        var title = 'New Comment'
        if(isEdit){
            title = 'Edit Comment'
        }
        return (
            <legend>{title}</legend>
        )
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch, id } = this.props

        const { comment, isEdit } = this.state

        if(isEdit){
            dispatch(handleUpdateComment(comment.id, comment))
        }else{
            dispatch(handleCreateComment(comment))
        }

        this.setState(() => ({
            comment: comment,
           toHome: id ? false : true,
        }))
    }

        
    render() {
        const { comment, toHome, isEdit } = this.state

        if(toHome === true && !isEdit){
            const redirectUrl = this.props.location.pathname.replace('/newComment','')
            return <Redirect to={redirectUrl} />
        }else if(toHome === true && isEdit){
            const redirectUrl = this.props.location.pathname.replace('/comment/'+ comment.id + '/edit','')
            return <Redirect to={redirectUrl} />
        }

        return (
        <div className="commentForm ">
            <form className="form-group" onSubmit={this.handleSubmit}>
                <fieldset >
                    {this.getIntentTitle()}
                    <div className="form-row ">
                        <textarea 
                            value={comment.body}
                            className="form-control col"
                            onChange={this.handleChangeBody}
                            id="commentFormTextArea"
                            rows="8"
                            placeholder="Write a comment"
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

function mapStateToProps({ comments }, router) {
 
    if(comments != null){
      return {
        comment: comments.items.filter((p) =>  p.id === router.match.params.commentId).shift(),
      }
    }
    return {}
}

export default withRouter(connect(mapStateToProps)(CommentForm));