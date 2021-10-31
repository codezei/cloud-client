import axios from "axios"
import {addFile, setFiles, deleteFileAction} from "../reducers/fileReducer"
import { showUploader, addFileUploader, changeFileUploader } from "../reducers/uploadReducer"
import { hideLoader, showLoader } from "../reducers/appReducer"
import { setAvatar, deleteAvatarAction } from "../reducers/userReducer"
import {API_URL} from "../config"

function getFiles (dirId, sort) {

    return async function (dispatch) {
        try {

            dispatch(showLoader())

            let url = API_URL + 'api/files'

            if (dirId) {
                url = `${API_URL}api/files?parent=${dirId}`
            }
            if (sort){
                url = `${API_URL}api/files?sort=${sort}`
            }
            if (dirId && sort){
                url = `${API_URL}api/files?parent=${dirId}&?sort=${sort}`
            }
            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })  
            dispatch(setFiles(response.data))
            
            

        } catch (e) {
            alert(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }

}

function searchFiles (searchValue) {
    return async function (dispatch) {
        try {
            dispatch(showLoader())
            const response = await axios.get(`${API_URL}api/files/search?search=${searchValue}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })  
            dispatch(setFiles(response.data))
            

        } catch (e) {
            alert(e.response.data.message)
        }
        finally {
            dispatch(hideLoader())
        }
    }
}

function createDir (dirId, name) {

    return async function (dispatch) {
        try {

            const response = await axios.post(`${API_URL}api/files`, {
                name,
                parent: dirId,
                type: "dir"
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })  
            dispatch(addFile(response.data))
            

        } catch (e) {
            alert(e.response.data.message)
        }
    }

}
function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const uploadFile = {name: file.name, id: Date.now(), progress: 0}
            const response = await axios.post(`${API_URL}api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        uploadFile.progress = progress
                        dispatch(changeFileUploader(uploadFile))
                    }
                }
            });
            dispatch(showUploader())
            dispatch(addFileUploader(uploadFile))
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

const downloadFile = async (file)=> {
    const response = await fetch(`${API_URL}api/files/download?id=${file._id}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    console.log(response)
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}


function deleteFile (file) {

    return async function (dispatch) {
        try {
            const response = await axios.delete(`${API_URL}api/files?id=${file._id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

}


function uploadAvatar(file) {
    return async function  (dispatch) {
        try {
           
            let fileAvatar = file
            const formData = new FormData()
            formData.append('file', fileAvatar)

            const response = await axios.post(`${API_URL}api/files/avatar`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(setAvatar(response.data.avatar))

        } catch (e) {
            alert(e.response.data.message)
        } 
    }
}

function deleteAvatar () {

    return async function (dispatch) {
        try {
 
            const response = await axios.delete(`${API_URL}api/files/avatar`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(deleteAvatarAction())
            console.log(response.data.message)
        } catch (e) {
            alert(e.response.data.message)
        } 
    }

}


export {getFiles, createDir, uploadFile, downloadFile, deleteFile, searchFiles, uploadAvatar, deleteAvatar} 