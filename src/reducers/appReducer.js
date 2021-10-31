const defaultState = {
    loader: false
}

const SHOW_LOADER = "SETSHOW_LOADER_USER"
const HIDE_LOADER = "HIDE_LOADER"

function appReducer(state = defaultState, action) {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state, loader: true
            }
        case HIDE_LOADER:
            return {
                ...state, loader: false
            }
        default:
            return state
    }
}

const showLoader = ()=>{
    return {
        type: SHOW_LOADER
    }
}
const hideLoader = ()=>{
    return {
        type: HIDE_LOADER
    }
}

export {showLoader, hideLoader, appReducer}