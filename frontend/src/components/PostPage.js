import React, { Component } from "react";
import { connect } from "react-redux";
import { handleReceiveCommentsByPost } from '../actions/comments'
import { handleReceivePost } from '../actions/posts'
import { withRouter } from 'react-router-dom'
import Post from './Post'
import Comment from './Comment'

class PostPage extends Component {

  componentDidMount(){
    this.props.dispatch(handleReceiveCommentsByPost(this.props.match.params.postId))
    this.props.dispatch(handleReceivePost(this.props.match.params.postId))
  }

  render() {
    const { post, comments } = this.props
    return (
        <div>
        {
          post !== undefined && post !== null && (
            <Post post={post} />
          )
        }
        <ul className="list-group list-group-flush">
          {comments != null && comments.map((comment) => (
              <li key={comment.id} className="list-group-item">
                <Comment id={comment.id} parentId={comment.parentId} />
              </li>
          ))}
        </ul>
        </div>
        
    )
  }
}


function mapStateToProps({ posts, comments}, router) {
    const post =  Object.keys(posts).length > 0 ? posts : null
    if(post != null){
      return {
        post: post,
        comments: Object.values(comments).filter((c) =>  c.parentId === router.match.params.postId),
      }
    }
    return {}
    
}

export default withRouter(connect(mapStateToProps)(PostPage));