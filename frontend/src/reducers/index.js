import { combineReducers } from "redux";
import categories from './categories'
import authedUser from './authedUser'
import posts from './posts'
import comments from './comments'
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
    authedUser,
    categories,
    posts,
    comments,
    loadingBar: loadingBarReducer
})