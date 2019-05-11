import React, { Component } from "react";
import { connect } from "react-redux";
import { handleReceiveCommentsByPost } from '../actions/comments'
import { withRouter } from 'react-router-dom'
import { handleReceivePost } from '../actions/posts'
import Post from './Post'
import Comment from './Comment'

class PostPage extends Component {

  componentDidMount(){
    this.props.dispatch(handleReceiveCommentsByPost(this.props.match.params.postId))
    //this.props.dispatch(handleReceivePost(this.props.match.params.postId))
  }

  render() {
    const { post, comments } = this.props
    return (
        <div>
        {
          post !== undefined && post !== null && (
            <Post id={post.id} />
          )
        }
        <ul className="list-group list-group-flush">
          {comments.map((comment) => (
              <li key={comment.id} className="list-group-item">
                <Comment id={comment.id} />
              </li>
          ))}
        </ul>
        </div>
        
    )
  }
}


function mapStateToProps({ posts, comments}, router) {
    return {
      post: Object.keys(posts).length > 0 ? posts : null,
      comments: Object.values(comments),
    }
}

export default withRouter(connect(mapStateToProps)(PostPage));