import { getInitialData } from "../utils/api"
import { receiveCategories } from "../actions/categories"
import { receivePosts } from "../actions/posts"
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_ID = 'rennanchagas'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ categories, posts}) => {
                dispatch(receiveCategories(categories))
                dispatch(receivePosts(posts))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}