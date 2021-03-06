import { showLoading, hideLoading } from 'react-redux-loading'
import { getComments, addComment, voteChange, deleteComment, updateComment } from "../utils/api"
import { commentCountPost, UP_COUNT_COMMENT, DOWN_COUNT_COMMENT } from './posts'
import { generateUID } from '../utils/helpers'

export const RECEIVE_COMMENTS_BY_POST = 'RECEIVE_COMMENTS_BY_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

function receiveCommentsByPost(comments) {
    return {
        type: RECEIVE_COMMENTS_BY_POST,
        comments,
    }
}

export function handleReceiveCommentsByPost(postId){
    return (dispatch) => {

        dispatch(showLoading())

        return getComments(postId)
            .then((comments) => {
                dispatch(receiveCommentsByPost(comments))
                dispatch(hideLoading())
            })
    }
}

function createComment(comment){
    return{
        type: CREATE_COMMENT,
        comment,
    }
}

export function handleCreateComment(comment) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        
        dispatch(showLoading())

        const idGenerated = generateUID();

        comment = {
            ...comment,
            id: idGenerated,
            timestamp: Math.floor(Date.now()),
            author: authedUser
        }

        return addComment(idGenerated, comment)
                .then((comment) => {
                    dispatch(createComment(comment))
                    dispatch(commentCountPost(comment.parentId, UP_COUNT_COMMENT))
                })
                .then(() => dispatch(hideLoading()))
    }
}

function voteComment(comment){
    return {
        type: VOTE_COMMENT,
        comment
    }
}

export function handleVoteComment(id, comment){
    return (dispatch) => {

        dispatch(showLoading())

        return voteChange(id, comment)
            .then((comment) => {
                dispatch(voteComment(comment))
                dispatch(hideLoading())
            })
    }
}

export function handleDeleteComment(commentId){
    return (dispatch) => {

        dispatch(showLoading())

        return deleteComment(commentId)
            .then((comment) => {
                dispatch(removeComment({comment}))
                dispatch(commentCountPost(comment.parentId, DOWN_COUNT_COMMENT))
                dispatch(hideLoading())
            })
    }
}

function removeComment({comment}){
    return {
        type: DELETE_COMMENT,
        comment
      }
}

function editComment({comment}){
    return {
      type: UPDATE_COMMENT,
      comment
    }
}

export function handleUpdateComment(id, comment){
    return (dispatch) => {
        dispatch(showLoading())

        return updateComment(id, comment.body).then(comment => {
            dispatch(editComment({comment}))
            dispatch(hideLoading())
        })
    }
}