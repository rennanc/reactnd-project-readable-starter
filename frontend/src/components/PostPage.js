import React, { Component } from "react";
import { connect } from "react-redux";
import { handleReceiveCommentsByPost } from '../actions/comments'
import Post from './Post'
import Comment from './Comment'

class PostPage extends Component {

  componentDidMount(){
    this.props.dispatch(handleReceiveCommentsByPost(this.props.match.params.postId))
  }

  render() {
    const { post, comments } = this.props
    return (
        <div>
        {
          post !== undefined && (
            <Post id={post.id} />
          )
        }
        {comments.map((comment) => (
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Comment id={comment.id} />
            </li>
          </ul>
        ))}
        </div>
        
    )
  }
}


function mapStateToProps({ posts, comments}) {
    return {
      post: posts[0],
      comments: Object.values(comments),
    }
}

export default connect(mapStateToProps)(PostPage);