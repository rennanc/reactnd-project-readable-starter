import { showLoading, hideLoading } from 'react-redux-loading'
import { getComments } from "../utils/api"


export const RECEIVE_COMMENTS_BY_POST = 'RECEIVE_COMMENTS_BY_POST'

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