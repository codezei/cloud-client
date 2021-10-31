const SET_FILES = "SET_FILES"
const SET_CURRENT_DIR = "SET_CURRENT_DIR"
const ADD_FILE = "ADD_FILE"
const PUSH_TO_STACK = "PUSH_TO_STACK"
const DELETE_FILE = "DELETE_FILE"
const SET_SEARCH_VALUE = "SET_SEARCH_VALUE"

const defaultState = {
    files: [],
    currentDir: null,
    dirStack: [],
    searchValue: ""
}

function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FILES:
            return {
                ...state, files: action.payload
            }
        case SET_CURRENT_DIR:
            return {
                ...state, currentDir: action.payload
            }
        case ADD_FILE:
            return {
                ...state, files: [...state.files, action.payload]
            }
        case PUSH_TO_STACK:
            return {
                ...state, dirStack: [...state.dirStack, action.payload]
            }
        case DELETE_FILE:
            return {
                ...state, files: [...state.files.filter((file)=>{return file._id !== action.payload})]
            }
        case SET_SEARCH_VALUE:
            return {
                ...state, searchValue: action.payload
            }
        default:
            return state
    }
}
const setFiles = (files)=>{
    return {
        type: SET_FILES,
        payload: files
    }
}
const setCurrentDir = (dir)=>{
    return {
        type: SET_CURRENT_DIR,
        payload: dir
    }
}

const addFile = (file)=>{
    return {
        type: ADD_FILE,
        payload: file
    }
}
const pushToStack = (dir) => {
    return {
        type: PUSH_TO_STACK,
        payload: dir
    }
}
const deleteFileAction = (dirId) => {
    return {
        type: DELETE_FILE,
        payload: dirId
    }
}
const setSearchValue = (value) => {
    return {
        type: SET_SEARCH_VALUE,
        payload: value
    }
}

export {setFiles, setCurrentDir, fileReducer, addFile, pushToStack, deleteFileAction, setSearchValue}