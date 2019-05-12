import { 
    RECEIVE_POSTS_BY_CATEGORY,
    RECEIVE_POST,
    CREATE_POST
 } from '../actions/posts'

export default function posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS_BY_CATEGORY:
            return {
                ...state,
                ...action.posts,
            }
        case RECEIVE_POST:
            return {
                ...state,
                ...action.post
            }
        case CREATE_POST:
            //const { post } = action

            //let replyingTo = {}
            
            /*if(post.replyingTo !== null){
                replyingTo = {
                    [post.replyingTo]: {
                        ...state[post.replyingTo],
                        replies: state[post.replyingTo].replies.concat([post.id])
                    }
                }
            }*/

            return {
                ...state,
                [action.posts.id]: action.post,
                //...replyingTo,
            }
        default:
            return state
    }
}