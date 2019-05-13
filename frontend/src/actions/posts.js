import { showLoading, hideLoading } from 'react-redux-loading'
import { getCatPost, getPost, addPost, voteChange } from "../utils/api"


export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY'
export const RECEIVE_POST = 'RECEIVE_POST'
export const CREATE_POST = 'RECEIVE_POST'
export const VOTE_POST = 'VOTE_POST'


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

        dispatch(showLoading())

        post.timestamp = Math.floor(Date.now())

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
    return (dispatch, getState) => {

        dispatch(showLoading())

        return voteChange(postId, vote, "posts")
            .then((post) => {
                dispatch(votePost(post))
                dispatch(hideLoading())
            })
    }
}