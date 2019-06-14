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
    DOWN_COUNT_COMMENT,
    ORDER_POST_BY,
    ORDER_BY_NEWER,
    ORDER_BY_RISING
 } from '../actions/posts'

export default function posts(state = { }, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                items: action.posts,
        }
        case RECEIVE_POSTS_BY_CATEGORY:
            return {
                ...state,
                items: action.posts,
            }
        case RECEIVE_POST:
            return {
                ...state,
                item: action.post,
            }
        case CREATE_POST:
            return {
                ...state,
                item: action.post,
                items: state.items.concat(action.post)
            }
        case DELETE_POST:
            return {
                ...state,
                items: state.items.filter((post) => post.id !== action.post.id)
            }
        case UPDATE_POST:
            return {
                ...state,
                item: action.post,
                items: state.items.map((p) => {
                    if(p.id === action.post.id){
                        return action.post
                    }
                    return p
                })
            }
        case COMMENT_COUNT_POST: 
            var commentCount = 0
            if(action.commentCountOption === UP_COUNT_COMMENT){
                commentCount = ++state.item.commentCount
            }
            if(action.commentCountOption === DOWN_COUNT_COMMENT){
                commentCount = --state.item.commentCount
            }
            return {
                ...state,
                item: {
                    ...state.item,
                    commentCount: commentCount
                },
                items: state.items.map((p) => {
                    if(p.id === action.postId){
                         p = state.item
                    }
                    return p
                })
            }
        case VOTE_POST:
            return {
                ...state,
                item: action.post,
                items: state.items.map((p) => {
                    if (p.id === action.post.id) {
                        return action.post;
                    }
                    return p;
                })
            }
        case ORDER_POST_BY:
            return {
                ...state,
                items: state.items.sort((a,b) => {
                    if(action.orderByIntent === ORDER_BY_NEWER){
                        return b.timestamp - a.timestamp
                    }
                    if(action.orderByIntent === ORDER_BY_RISING){
                        return b.voteScore - a.voteScore
                    }
                })
            }
        default:
            return state
    }
}