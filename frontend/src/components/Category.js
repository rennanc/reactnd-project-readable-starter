import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'

class Category extends Component {
  render() {
    const { category } = this.props
    return (
      <Link to={`/${category.path}`} className='tweet'>
          <div className="Category">
            {category.name}
          </div>
      </Link>
    )
  }
}


function mapStateToProps({categories}, { name }) {
  const category = Object.values(categories).filter((c) => c === name)

  return {
    category: category
  }
}

export default withRouter(connect(mapStateToProps)(Category));