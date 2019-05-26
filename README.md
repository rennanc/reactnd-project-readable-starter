# Readable Frontend

This project was elaborated to the Udacity Test, in this project you can see a project with a structure of project for React with Redux. 

## Instruction to Use:
 - `cd frontend`
 - `yarn`
 - `yarn start`


## Navigation:

* Dashboard - "/"
  The dashboard show all posts registered in the project without apply category filter.
  In this page, you can choice a kind of category to filter or access directly the functions of Post
* Category Page - "/categories/:category"
  It show all posts of specific category
* Post Page - "/categories/:category/posts/:postId"
  It show the page of Post with all comments related the post choose.
* Edit Post - "/categories/:category/posts/:postId/edit"
  It show the page to edit Post
* New Post - "/categories/:category/posts/:postId/newPost"
  It show the page to create a Post
* Edit Comment - "/categories/:category/posts/:postId/comment/:commentId/edit"
  It show the page to edit comment
* New Comment - "/categories/:category/posts/:postId/comment/:commentId/newComment"
  It show the page to create a comment



# Readable API Server

This is the starter project for the final assessment project for Udacity's Redux course where you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

## Start Developing

To get started developing right away:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, use Create React App to scaffold out the front-end
    - `create-react-app frontend`
    - `cd frontend`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).
