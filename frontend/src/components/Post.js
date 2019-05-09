import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { GoArrowUp, GoArrowDown } from "react-icons/go";

class Post extends Component {
  render() {
    const { post } = this.props
    return (
        <div key={post.id} className="card-body">
          <div className="row">
            <div className="col-1 text-center">
              <div><Link to="/"><GoArrowUp /></Link></div>
              <div>{post.voteScore}</div>
              <div><Link to="/"><GoArrowDown /></Link></div>
            </div>
            <div className="col col-auto">
              <h5 className="card-title">{post.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">@{post.author} - {formatDate(post.timestamp)}</h6>
              <p className="card-text">{post.body}</p>
              <Link to={`/categories/${post.category}/${post.id}`}  className='card-link'>Comment ({post.commentCount})</Link>
            </div>
          </div>
         
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