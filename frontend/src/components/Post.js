import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'
import { formatDate } from '../utils/helpers'

class Post extends Component {
  render() {
    const { post } = this.props
    return (
        <div key={post.id} className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">@{post.author} - {formatDate(post.timestamp)}</h6>
            <p className="card-text">{post.body}</p>
            <Link to={`/categories/${post.category}/${post.id}`} className='card-link'>Comment ({post.commentCount})</Link>
            <Link to='' className='card-link'>Vote ({post.voteScore})</Link>
        </div>
    )
  }
}


function mapStateToProps({ posts }, { id }) {
    return {
      post: Object.values(posts).filter((p) => p.id === id)[0],
    }
  }

export default connect(mapStateToProps)(Post);