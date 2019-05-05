import { getInitialData } from "../utils/api"
import { receiveCategories } from "../actions/categories"
import { showLoading, hideLoading } from "react-redux-loading";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ categories}) => {
                dispatch(receiveCategories(categories))
                dispatch(hideLoading())
            })
    }
}