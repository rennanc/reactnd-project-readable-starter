import React, { Component } from "react";
import { connect } from "react-redux";
import Category from './Category'
import Post from './Post'

class Dashboard extends Component {
  render(){
    console.log(this.props)

    const { posts, categoryNames } = this.props
    
    return (
      <div>
        <ul className='category-list list-group list-group-horizontal-md'>
          {categoryNames.map((name, index) => (
            <li className="list-group-item" key={index}>
              <Category key={index} name={name} />
            </li>
          ))}
        </ul>
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
      categoryNames: Object.keys(categories)
          .sort((a,b) => categories[b].name -  categories[a].name),
      posts: Object.values(posts).filter((p) => p.title != null)
  }
}

export default connect(mapStateToProps)(Dashboard);