import React, { Component } from "react";
import { connect } from "react-redux";
import Category from './Category'

class Dashboard extends Component {
  render(){
    console.log(this.props)
    
    return (
      <div>
        <ul className='category-list'>
          {this.props.categoryNames.map((name) => (
            <Category key={name} name={name} />
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({categories}) {
  return {
      categoryNames: Object.keys(categories)
          .sort((a,b) => categories[b].name -  categories[a].name)
  }
}

export default connect(mapStateToProps)(Dashboard);