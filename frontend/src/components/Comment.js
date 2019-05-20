import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { handleDeleteComment, handleVoteComment } from '../actions/comments'

const UP_VOTE = 'upVote'
const DOWN_VOTE = 'downVote'

class Comment extends Component{

  handleVote = (e, vote) => {
    const { comment, dispatch } = this.props
    dispatch(handleVoteComment(comment.id, vote))
  }

  handleRemoveComment = (e) => {
    const { comment, dispatch } = this.props
    dispatch(handleDeleteComment(comment.id))
  }

  render(){
    const { comment } = this.props
    return (
      <div className="Comment ">
        <div className="row">
          <div className="col-1 text-center">
              <button 
                type="button"
                className="btn btn-link"
                onClick={(e) => this.handleVote(e, UP_VOTE)}
                ><GoArrowUp /></button>
              <div className="text-nowrap">{comment.voteScore}</div>
              <button 
              type="button" 
              className="btn btn-link"
              onClick={(e) => this.handleVote(e, DOWN_VOTE)}
              >
              <GoArrowDown /></button>
          </div>
          <div>
            <div className="col col-auto">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-1">@{comment.author}</h6>
                <small>{formatDate(comment.timestamp)}</small>
              </div>
              <p className="mb-1">{comment.body}</p>
            </div>
            <div className="row ">
              <Link to={`/categories/4343/posts/32432432/comment/dadasdas/edit`}>
                <button  className='card-link btn btn-link'>Edit</button>
              </Link>
              <button className='card-link btn btn-link' onClick={(e) => this.handleRemoveComment(e)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({comments}, { id, parentId }) {
  return {
    comment: Object.values(comments).filter((c) => c.id === id && c.parentId === parentId)[0]
  }
}

export default connect(mapStateToProps)(Comment);