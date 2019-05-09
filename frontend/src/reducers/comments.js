import { RECEIVE_COMMENTS_BY_POST } from '../actions/comments'

export default function comments(state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS_BY_POST:
            return {
                ...state,
                ...action.comments,
            }
        default:
            return state
    }
}