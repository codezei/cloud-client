const SHOW_UPLOADER = "SHOW_UPLOADER"
const HIDE_UPLOADER = "HIDE_UPLOADER"
const ADD_FILE_UPLOADER = "ADD_FILE_UPLOADER"
const CHANGE_FILE_UPLOADER = "CHANGE_FILE_UPLOADER"


const defaultState = {
    files: [],
    isVisible: false,
}

function uploadReducer(state = defaultState, action) {
    switch (action.type) {
        case SHOW_UPLOADER:
            return {
                ...state, isVisible: true
            }
        case HIDE_UPLOADER:
            return {
                ...state, isVisible: false
            }
        case ADD_FILE_UPLOADER:
            return {
                ...state, files: [...state.files, action.payload]
            }
        case CHANGE_FILE_UPLOADER:
            return {
                ...state, files: [...state.files.map(file=>file.id === action.payload ?
                            { ...file, progress: action.payload.progress} :
                            {...file}

                )]
            }
        default:
            return state
    }
}
const showUploader = ()=>{
    return {
        type: SHOW_UPLOADER,
    }
}
const hideUploader = ()=>{
    return {
        type: HIDE_UPLOADER,
    }
}

const addFileUploader = (file)=>{
    return {
        type: ADD_FILE_UPLOADER,
        payload: file
    }
}
const changeFileUploader = (file) => {
    return {
        type: CHANGE_FILE_UPLOADER,
        payload: file
    }
}


export {uploadReducer, showUploader, hideUploader, addFileUploader, changeFileUploader}