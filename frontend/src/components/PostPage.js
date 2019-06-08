import React, { Component } from "react";
import { connect } from "react-redux";
import { handleReceiveCommentsByPost } from '../actions/comments'
import { handleReceivePost } from '../actions/posts'
import { Link, withRouter } from 'react-router-dom'
import Post from './Post'
import Comment from './Comment'

const NEW_POST = "newPost"

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
              <div>
                <Post post={post} />
                <Link to={`/${post.category}/${post.id}/newComment`}>
                  <button type="button" className="btn btn-primary">Add Comment</button>
                </Link>
              </div>
            )
          }
          <ul className="list-group list-group-flush">
            {comments != null && comments.map((comment) => (
                <li key={comment.id} className="list-group-item">
                  <Comment id={comment.id} parentId={comment.parentId} comment={comment} />
                </li>
            ))}
          </ul>
        </div>
        
    )
  }
}


function mapStateToProps({ posts, comments}, router) {
    var post = null;
    if(router.match.params.postId !== NEW_POST){
      post = Object.values(posts).filter((p) => p.id === router.match.params.postId).shift()
    }
    if(post != null){
      return {
        post: post,
        comments: Object.values(comments).filter((c) =>  c.parentId === router.match.params.postId),
      }
    }
    return {}
    
}

export default withRouter(connect(mapStateToProps)(PostPage));