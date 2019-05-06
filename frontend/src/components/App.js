import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from "react-redux"
import { handleInitialData } from "../actions/shared"
import LoadingBar from 'react-redux-loading'
import Dashboard  from './Dashboard'
import CategoryPage from "./CategoryPage";
import PostPage from "./PostPage";
import Nav from './Nav'

import '../App.css';


class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render(){
    console.log(this.props.categories)
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App container-fluid">
            <Nav />
            {this.props.loading === true
              ? null
              :
              <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/categories/:path' component={CategoryPage} />
                <Route path='/categories/:path/:postId' component={PostPage} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default connect()(App);
