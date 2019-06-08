import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { handleVotePost, handleDeletePost } from '../actions/posts'

const UP_VOTE = 'upVote'
const DOWN_VOTE = 'downVote'

class Post extends Component {

  handleVote = (e, vote) => {
    const { post, dispatch } = this.props
    dispatch(handleVotePost(post.id, vote))
  }

  handleRemovePost = (e) => {
    const { post, dispatch } = this.props
    dispatch(handleDeletePost(post.id))
  }

  render() {
    const { post } = this.props
    return (
      <div className="card" >
        <div  className="card-body">
          { post != null && (
            <div className="row">
            <div className="col-1 text-center">
              <button 
                type="button"
                className="btn btn-link"
                onClick={(e) => this.handleVote(e, UP_VOTE)}
                ><GoArrowUp /></button>
              <div className="text-nowrap">{post.voteScore}</div>
              <button 
              type="button" 
              className="btn btn-link"
              onClick={(e) => this.handleVote(e, DOWN_VOTE)}
              >
              <GoArrowDown /></button>
            </div>
            <div className="col col-auto">
              <h5 className="card-title">{post.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">@{post.author} - {formatDate(post.timestamp)}</h6>
              <p className="card-text">{post.body}</p>
              <Link to={`/${post.category}/${post.id}`}>
                <button  className='card-link btn btn-link'>Comment ({post.commentCount})</button>
              </Link>
              <Link to={`/${post.category}/${post.id}/edit`}>
                <button  className='card-link btn btn-link'>Edit</button>
              </Link>
              <button className='card-link btn btn-link' onClick={(e) => this.handleRemovePost(e)}>Delete</button>
            </div>
          </div>
          )}
        </div>
      </div>
    )
  }
}

export default connect()(Post);