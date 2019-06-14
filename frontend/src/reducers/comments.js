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
                items: action.comments
            }
        case CREATE_COMMENT:
            return {
                ...state,
                item: action.comment,
                items: state.items.concat(action.comment)
            }
        case DELETE_COMMENT:
            return {
                ...state,
                items: state.items.filter((comment) => comment.id !== action.comment.id)
            }
        case VOTE_COMMENT:
            return {
                ...state,
                item: action.comment,
                items: state.items.map((c) => {
                    if (c.id === action.comment.id) {
                        return action.comment;
                    }
                    return c;
                })
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                item: action.comment,
                items: state.items.map((c) => {
                    if(c.id === action.comment.id){
                        return action.comment
                    }
                    return c
                })
            }
        default:
            return state
    }
}