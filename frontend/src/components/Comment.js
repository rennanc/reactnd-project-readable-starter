import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { GoArrowUp, GoArrowDown } from "react-icons/go";

class Comment extends Component{
  render() {
    const { comment } = this.props
    return (
      <div className="Comment ">
        <div className="row">
          <div className="col-1 text-center">
            <div><Link to="/"><GoArrowUp /></Link></div>
            <div>{comment.voteScore}</div>
            <div><Link to="/"><GoArrowDown /></Link></div>
          </div>
          <div className="col col-auto">
            <div className="d-flex w-100 justify-content-between">
              <h6 className="mb-1">@{comment.author}</h6>
              <small>{formatDate(comment.timestamp)}</small>
            </div>
            <p className="mb-1">{comment.body}</p>
          </div>
        </div>
        <hr/>
        <div className="col"><Link to="/">Reply</Link></div>
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