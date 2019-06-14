import React, { Component } from "react";
import { connect } from "react-redux";
import { handleOrderPostBy, ORDER_BY_NEWER, ORDER_BY_RISING } from '../actions/posts'
import Post from './Post'
import {Selector} from './Selector'

class Dashboard extends Component {

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
    console.log(this.props)

    const { posts } = this.props
    const orderByItems = [
      {value : ORDER_BY_NEWER, name : 'Newer'},
      {value : ORDER_BY_RISING, name : 'Rising'},
    ]
    
    return (
      <div>
        <div className="row">
          <div className="col-2 form-group ">
            <label htmlFor="orderPosts">Order By</label>
            <Selector 
              arrayValuesAndNames={orderByItems}
              name="orderBy"
              value={this.state.orderBy}
              handleChange={this.handleChangeOrderBy}
            />
          </div>
        </div>
        <ul className='category-list list-group list-group-flush'>
          {posts.map((post,index) => (
            <li className="list-group-item" key={index}>
              <Post post={post} key={index}  />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({categories, posts}) {
  return {
      categoryNames: Object.values(categories)
          .sort((a,b) => b.name -  a.name),
      posts: posts.items
  }
}

export default connect(mapStateToProps)(Dashboard);