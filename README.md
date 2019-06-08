# Initial instruction

To use the frontend project, you need follow before the steps to run the Api Server.

# Readable Frontend

This project was elaborated to the Udacity Test, in this project you can see a project with a structure of project for React with Redux. 

## Instruction to Use:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`

* Install and start the FrontEnd
     - `cd frontend`
     - `yarn`
     - `yarn start`


## Navigation:

* Dashboard - "/"
  The dashboard show all posts registered in the project without apply category filter.
  In this page, you can choice a kind of category to filter or access directly the functions of Post
* Category Page - "/:category"
  It show all posts of specific category
* Post Page - "/:category/posts/:postId"
  It show the page of Post with all comments related the post choose.
* Edit Post - "/:category/posts/:postId/edit"
  It show the page to edit Post
* New Post - "/:category/posts/:postId/newPost"
  It show the page to create a Post
* Edit Comment - "/:category/posts/:postId/comment/:commentId/edit"
  It show the page to edit comment
* New Comment - "/:category/posts/:postId/comment/:commentId/newComment"
  It show the page to create a comment


# Readable API Server

This is the starter project for the final assessment project for Udacity's Redux course where you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.