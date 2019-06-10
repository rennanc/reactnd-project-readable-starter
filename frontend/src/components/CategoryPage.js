import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import Post from './Post'


class CategoryPage extends Component {

  render(){
    const { category, posts } = this.props
    console.log(this.props)
    return (
      <div>
        {
          category !== undefined &&
          (
            <div key={category.name}>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Category {category.name}</li>
                </ol>
              </nav>
              <div className="row">
                <div className="col">
                  <Link to={`/${category.path}/newPost`}>
                    <button type="button" className="btn btn-primary">Create Post</button>
                  </Link>
                </div>
                <div className="col form-group">
                  <label htmlFor="orderPosts">Order By</label>
                  <select className="form-control" id="orderPosts">
                    <option>New</option>
                    <option>Rising</option>
                  </select>
                </div>
              </div>
              {posts != null && posts.map((post) => (
                <Post post={post} key={post.id} />
              ))}
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
  const category = categoriesList.filter((c) => c.path === router.match.params.category).shift()

  if(category != null){
    const postsFiltered = Object.values(posts).filter((p) => p.category === category.path)
    return {
      category: category,
      posts: postsFiltered,
    }
  }
  return {}
}

export default connect(mapStateToProps)(CategoryPage);