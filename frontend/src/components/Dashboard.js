import React, { Component } from "react";
import { connect } from "react-redux";
import Category from './Category'

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