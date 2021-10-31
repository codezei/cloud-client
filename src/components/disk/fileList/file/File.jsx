import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { downloadFile, deleteFile } from '../../../../actions/file'
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer'
import "./File.scss"

function File ({file}) {
    const dirImg = <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-folder-fill" viewBox="0 0 16 16"><path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" /></svg>
    const fileImg = <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-file-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" /></svg>
    const downloadImg = <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-download" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" /><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" /></svg>
    const removeImg = <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /><path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /></svg>
  
    
    const dispatch = useDispatch()
    const currentDir = useSelector(state=>state.files.currentDir)

    function openDirHandler (file) {
        if (file.type === "dir") {
            dispatch(setCurrentDir(file._id))
            dispatch(pushToStack(currentDir))
        }
    }
    function downloadClickHandler (e) {
        e.stopPropagation()
        downloadFile(file)
    }
    function deleteFileHandler() {
        dispatch(deleteFile(file))
    }
    function sizeFormat(size) {
        if (size > 1024*1024*1024) {
            return (size/(1024*1024*1024)).toFixed(1) + ' Gb'
        }
        if (size > 1024*1024) {
            return (size/(1024*1024)).toFixed(1) + ' Mb'
        }
        if (size > 1024) {
            return (size/(1024)).toFixed(1) + ' Kb'
        }
        return "0"
    }


    return (
        <div className="file row align-items-center" onDoubleClick={()=>{openDirHandler(file)}}>
            <div className="col-1 col-xl-1 file__img">
                {file.type === "dir" ? dirImg : fileImg}
            </div>
            <div className="col-5 col-xl-7 file__name">
                {file.name}
                {file.type !== "dir" ?
                    <div className="file__actions">
                        <button className="file__download btn btn-outline-dark me-1" onClick={(e)=>{downloadClickHandler(e)}}>
                            {downloadImg}
                        </button>
                        <button className="file__remove btn btn-outline-dark" onClick={deleteFileHandler}>
                            {removeImg}
                        </button>
                    </div>
                    :
                    <div className="file__actions">
                        <button className="file__remove btn btn-outline-dark" onClick={deleteFileHandler}>
                            {removeImg}
                        </button>
                    </div>
                    }

            </div>
            <div className="col-3 col-xl-2 file__date">{file.date.slice(0, 10)}</div>
            <div className="col-3 col-xl-2 file__size">{sizeFormat(file.size)}</div>
        </div>
    )
}

export default File