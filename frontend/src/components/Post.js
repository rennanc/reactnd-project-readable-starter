import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { GoArrowUp, GoArrowDown } from "react-icons/go";

class Post extends Component {

  componentDidMount () {
    const { handle } = this.props.match.params
    console.log("aqui"+this.props.match.params)
  }

  render() {
    const { post } = this.props
    return (
        <div  className="card-body">
        { post != null && (
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
        )}
      </div>
    )
  }
}


function mapStateToProps({ posts }, { id }) {
    if(id !== null){
      return {
        post: Object.values(posts).filter((p) => p.id === id)[0],
      }
    }
  }

export default withRouter(connect(mapStateToProps)(Post));