const defaultState = {
    currentUser: {},
    isAuth: false
}

const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
const SET_AVATAR = "SET_AVATAR"
const DELETE_AVATAR = "DELETE_AVATAR"

function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state, currentUser: action.payload.user, isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state, currentUser: {}, isAuth: false
            }
        case SET_AVATAR:
            return {
                ...state, currentUser: {...state.currentUser, avatar: action.payload}
            }
        case DELETE_AVATAR:
            return {
                ...state, currentUser: {...state.currentUser, avatar: null}
            }
        default:
            return state
    }
}

const setUser = (user)=>{
    return {
        type: SET_USER,
        payload: user
    }
}
const setAvatar = (user)=> {
    return {
        type: SET_AVATAR,
        payload: user
    }
}
const deleteAvatarAction = ()=> {
    return {
        type: DELETE_AVATAR
    }
}
const logout = ()=>{
    return {
        type: LOGOUT
    }
}

export {userReducer, setUser, logout, setAvatar, deleteAvatarAction}