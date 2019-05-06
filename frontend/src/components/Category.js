import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'

class Category extends Component {
  render() {
    const { category } = this.props
    return (
      <Link to={`/categories/${category.path}`} className='tweet'>
          <div className="Category">
            {category.name}
          </div>
      </Link>
    )
  }
}


function mapStateToProps({categories}, { name }) {
  const category = categories[name]

  return {
    category: category
  }
}

export default withRouter(connect(mapStateToProps)(Category));