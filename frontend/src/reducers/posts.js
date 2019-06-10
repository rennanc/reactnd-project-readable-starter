import { 
    RECEIVE_POSTS,
    RECEIVE_POSTS_BY_CATEGORY,
    RECEIVE_POST,
    CREATE_POST,
    DELETE_POST,
    UPDATE_POST,
    VOTE_POST,
    COMMENT_COUNT_POST,
    UP_COUNT_COMMENT,
    DOWN_COUNT_COMMENT
 } from '../actions/posts'

export default function posts(state = { }, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                ...action.posts,
        }
        case RECEIVE_POSTS_BY_CATEGORY:
            return {
                ...state,
                ...action.posts,
            }
        case RECEIVE_POST:
            return {
                ...state,
                [action.post.id]: action.post,
            }
        case CREATE_POST:
            return {
                ...state,
                [action.post.id]: action.post,
            }
        case DELETE_POST:
            return Object.assign({},Object.values(state).filter(c => c.id !== action.post.id))
        case UPDATE_POST:
            return {
                ...state,
                ...action.post,
            }
        case COMMENT_COUNT_POST: 
            return Object.assign({},Object.values(state).map((p) => {
                if (p.id === action.postId) {
                    if(action.commentCountOption === UP_COUNT_COMMENT){
                        p.commentCount++;
                    }
                    if(action.commentCountOption === DOWN_COUNT_COMMENT){
                        p.commentCount--;
                    }
                }
                return p;
            }))
        case VOTE_POST:
            return Object.assign({},Object.values(state).map((p) => {
                    if (p.id === action.post.id) {
                        return action.post;
                    }
                    return p;
                }))
        default:
            return state
    }
}