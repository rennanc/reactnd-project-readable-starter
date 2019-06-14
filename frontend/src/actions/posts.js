import { showLoading, hideLoading } from 'react-redux-loading'
import { getCatPost, getPost, addPost, voteChange, deletePost, updatePost } from "../utils/api"

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY'
export const RECEIVE_POST = 'RECEIVE_POST'
export const CREATE_POST = 'CREATE_POST'
export const VOTE_POST = 'VOTE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const COMMENT_COUNT_POST = 'COMMENT_COUNT_POST'

export const UP_COUNT_COMMENT = 'upCountComment'
export const DOWN_COUNT_COMMENT = 'downCountComment'

export function receivePosts(posts){
    return {
        type: RECEIVE_POSTS,
        posts,
    }
}

function receivePostsByCategory(posts) {
    return {
        type: RECEIVE_POSTS_BY_CATEGORY,
        posts,
    }
}

export function handleReceivePostsByCategory(categoryName){
    return (dispatch) => {

        dispatch(showLoading())

        return getCatPost(categoryName)
            .then((posts) => {
                dispatch(receivePostsByCategory(posts))
                dispatch(hideLoading())
            })
    }
}

function receivePost(post) {
    return {
        type: RECEIVE_POST,
        post: post
    }
}

export function handleReceivePost(postId){
    return (dispatch) => {

        dispatch(showLoading())

        return getPost(postId)
            .then((post) => {
                dispatch(receivePost(post))
                dispatch(hideLoading())
            })
    }
}

function createPost(post){
    return{
        type: CREATE_POST,
        post,
    }
}

export function handleCreatePost(id, post) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        post = {
            ...post,
            id: id,
            timestamp: Math.floor(Date.now()),
            author: authedUser
        }

        return addPost(id, post)
                .then((post) => dispatch(createPost(post)))
                .then(() => dispatch(hideLoading()))
    }
}

function votePost(post){
    return {
        type: VOTE_POST,
        post
    }
}

export function handleVotePost(postId, vote){
    return (dispatch) => {
        dispatch(showLoading())

        return voteChange(postId, vote, "posts")
            .then((post) => {
                dispatch(votePost(post))
                dispatch(hideLoading())
            })
    }
}


export function commentCountPost(postId, commentCountOption) {
    return {
        type: COMMENT_COUNT_POST,
        commentCountOption,
        postId,
    }
}

export function editPost ({post, postType}){
    return {
      type: UPDATE_POST,
      postType,
      post
    }
}

export function handleUpdatePost(id, post){
    return (dispatch) => {
        dispatch(showLoading())

        return updatePost(id, post).then(post => {
            dispatch(editPost({post}))
            dispatch(hideLoading())
        })
    }
}

export function removePost ({post}){
    return {
      type: DELETE_POST,
      post
    }
}

export function handleDeletePost(postId){
    return (dispatch) => {

        dispatch(showLoading())

        return deletePost(postId)
            .then((post) => {
                dispatch(removePost({post}))
                dispatch(hideLoading())
            })
    }
}