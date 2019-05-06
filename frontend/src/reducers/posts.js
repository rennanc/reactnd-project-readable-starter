import { RECEIVE_POSTS_BY_CATEGORY } from '../actions/posts'

export default function posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS_BY_CATEGORY:
            return {
                ...state,
                ...action.posts,
            }
        default:
            return state
    }
}