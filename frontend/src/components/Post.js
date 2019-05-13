import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { handleVotePost } from '../actions/posts'

const UP_VOTE = 'upVote'
const DOWN_VOTE = 'downVote'

class Post extends Component {

  handleVote = (e, vote) => {
    const { post } = this.props
    this.props.dispatch(handleVotePost(post.id, vote))
  }

  render() {
    const { post } = this.props
    console.log("state aqui")
    console.log(this.state)
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
              <Link to={`/categories/${post.category}/posts/${post.id}`}  className='card-link'>Comment ({post.commentCount})</Link>
              <Link to={`/categories/${post.category}/posts/${post.id}`}  className='card-link'>Edit</Link>
              <Link to={`/categories/${post.category}/posts/${post.id}`}  className='card-link'>Delete</Link>
            </div>
          </div>
          )}
        </div>
      </div>
    )
  }
}

export default connect()(Post);