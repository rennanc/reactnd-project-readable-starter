import React, { Component } from "react";
import { connect } from "react-redux";
import { handleReceivePostsByCategory } from '../actions/posts'
import { Link } from 'react-router-dom'
import Post from './Post'


class CategoryPage extends Component {

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
              <div className="row">
                <div className="col">
                  <Link to={`/categories/${category.path}/newPost`}>
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
              <hr/>
              <div className="card" >
                  {posts != null && posts.map((post) => (
                    <Post post={post} key={post.id} />
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

  var postsFiltered;
  if(category != null && category.length > 0){
    postsFiltered = Object.values(posts).filter(p => p.category === category[0].path)
  }


  return {
    category: category,
    posts: postsFiltered,
  }
}

export default connect(mapStateToProps)(CategoryPage);