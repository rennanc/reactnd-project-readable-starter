import React, { Component } from "react";
import { connect } from "react-redux";
import Category from './Category'
import Post from './Post'

class Dashboard extends Component {
  render(){
    console.log(this.props)
    
    return (
      <div>
        <ul className='category-list list-group list-group-horizontal-md'>
          {this.props.categoryNames.map((name) => (
            <li className="list-group-item" key={name}>
              <Category key={name} name={name} />
            </li>
          ))}
        </ul>
        <ul className='category-list list-group list-group-flush'>
          {this.props.posts.map((post) => (
            <li className="list-group-item" key={post.id}>
              <Post post={post} key={post.id}  />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({categories, posts}) {
  return {
      categoryNames: Object.keys(categories)
          .sort((a,b) => categories[b].name -  categories[a].name),
      posts: Object.values(posts).filter((p) => p.title != null)
  }
}

export default connect(mapStateToProps)(Dashboard);