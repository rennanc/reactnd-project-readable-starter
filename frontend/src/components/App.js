import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from "react-redux"
import { handleInitialData } from "../actions/shared"
import LoadingBar from 'react-redux-loading'
import Dashboard  from './Dashboard'
import CategoryPage from "./CategoryPage";
import PostPage from "./PostPage";
import NewPost from "./NewPost";
import NewComment from "./NewComment";
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
            <br/>
            {this.props.loading === true
              ? null
              :
              <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/categories/:category' exact component={CategoryPage} />
                <Route path='/categories/:category/posts/:postId' component={PostPage} />
                <Route path='/categories/:category/posts/:postId/newComment' component={NewComment} />
                <Route path='/categories/:category/newPost' exact component={NewPost} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({authedUser}) {
  return{
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
