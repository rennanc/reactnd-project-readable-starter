import { showLoading, hideLoading } from 'react-redux-loading'
import { getCatPost } from "../utils/api"


export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY'

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