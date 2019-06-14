import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from "react-redux"
import { handleInitialData } from "../actions/shared"
import LoadingBar from 'react-redux-loading'
import Dashboard  from './Dashboard'
import CategoryPage from "./CategoryPage";
import PostPage from "./PostPage";
import PostForm from "./PostForm";
import CommentForm from "./CommentForm";
import Navigation from './Navigation'

import '../App.css';


class App extends Component {

  componentWillMount(){
    this.props.dispatch(handleInitialData())
  }

  render(){
    console.log(this.props.categories)
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App container-fluid">
            <Navigation categories={this.props.categories} />
            <br/>
            {this.props.loading === true
              ? null
              :
              <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/:category' exact component={CategoryPage} />
                <Route path='/:category/newPost' exact component={PostForm} />
                <Route path='/:category/:postId' component={PostPage} />
                <Route path='/:category/:postId/edit' component={PostForm} />
                <Route path='/:category/:postId/newComment' component={CommentForm} />
                <Route path='/:category/:postId/comment/:commentId/edit' component={CommentForm} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({authedUser, categories}) {
  return{
    loading: authedUser === null,
    categories: Object.values(categories)
          .sort((a,b) => b.name - a.name),
  }
}

export default connect(mapStateToProps)(App);
