import { 
    RECEIVE_COMMENTS_BY_POST,
    CREATE_COMMENT,
    VOTE_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT
 } from '../actions/comments'

export default function comments(state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS_BY_POST:
            return {
                ...state,
                ...action.comments,
            }
        case CREATE_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment,
            }
        case DELETE_COMMENT:
            return Object.assign({},Object.values(state).filter(c => c.id !== action.comment.id))
        case VOTE_COMMENT:
            return Object.assign({},Object.values(state).map((c) => {
                    if (c.id === action.comment.id) {
                        return action.comment;
                    }
                    return c;
                }))
        case UPDATE_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment,
            }
        default:
            return state
    }
}