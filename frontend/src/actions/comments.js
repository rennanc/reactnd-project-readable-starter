import { showLoading, hideLoading } from 'react-redux-loading'
import { getComments, addComment, voteChange } from "../utils/api"


export const RECEIVE_COMMENTS_BY_POST = 'RECEIVE_COMMENTS_BY_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

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

function createComment(post){
    return{
        type: CREATE_COMMENT,
        post,
    }
}

export function handleCreateComment(id, comment) {
    return (dispatch, getState) => {

        dispatch(showLoading())

        comment.timestamp = Math.floor(Date.now())

        return addComment(id, comment)
                .then((comment) => dispatch(createComment(comment)))
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