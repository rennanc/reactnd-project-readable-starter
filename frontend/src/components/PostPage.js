import React, { Component } from "react";
import { connect } from "react-redux";
import { handleReceivePostsByCategory } from '../actions/posts'
import { Link } from 'react-router-dom'
import Post from './Post'


class PostPage extends Component {

  componentDidMount(){
    this.props.dispatch(handleReceivePostsByCategory(this.props.match.params.path))
  }

  render(){
    const { category, posts } = this.props
    console.log(this.props)
    return (
      <div>
        {
          category !== undefined &&
          (
            <div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Category {category.name}</li>
                </ol>
              </nav>
            
              <div className="card" >
                  {posts.map((post) => (
                    <Post id={post.id} />
                  ))
                  }
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

function mapStateToProps({categories, posts}, router) {

  //category
  const categoriesList = Object.values(categories);
  const category = categoriesList.filter(c => c.path === router.match.params.path)

  return {
    category: category[0],
    posts: Object.values(posts),
  }
}

export default connect(mapStateToProps)(PostPage);