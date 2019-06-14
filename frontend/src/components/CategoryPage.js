import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import Post from './Post'
import { handleOrderPostBy, ORDER_BY_NEWER, ORDER_BY_RISING } from '../actions/posts'
import {Selector} from './Selector'


class CategoryPage extends Component {

  state = { 
    orderBy: ORDER_BY_NEWER
  }

  componentDidMount(){
    this.props.dispatch(handleOrderPostBy(ORDER_BY_NEWER))
  }

  handleChangeOrderBy = (event) => {
    this.setState({ 
      [event.target.name]: event.target.value 
    })
    
    this.props.dispatch(handleOrderPostBy(event.target.value))
  }

  render(){
    const { category, posts } = this.props
    const orderByItems = [
      {value : ORDER_BY_NEWER, name : 'Newer'},
      {value : ORDER_BY_RISING, name : 'Rising'},
    ]
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
                  <Selector 
                    arrayValuesAndNames={orderByItems}
                    name="orderBy"
                    value={this.state.orderBy}
                    handleChange={this.handleChangeOrderBy}
                  />
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
    const postsFiltered = posts.items.filter((p) => p.category === category.path)
    return {
      category: category,
      posts: postsFiltered,
    }
  }
  return {}
}

export default connect(mapStateToProps)(CategoryPage);