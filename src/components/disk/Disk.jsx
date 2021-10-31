import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getFiles, createDir, uploadFile, searchFiles} from '../../actions/file'
import FileList from './fileList/FileList'
import "./Disk.scss"
import { setCurrentDir, setSearchValue } from '../../reducers/fileReducer'
import Uploader from '../uploader/Uploader'
import Loader from '../loader/Loader'



function Disk () {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => {return state.files.currentDir})
    const dirStack = useSelector(state=>state.files.dirStack)
    const loader = useSelector(state=>state.app.loader)
    const [dragEnter, setDragEnter] = React.useState(false)
    const [sort, setSort] = React.useState("")
    const [search, setSearch] = React.useState("")



    function createDirHandler () {

        let answer = prompt()
        if (answer) {
            dispatch(createDir(currentDir, answer))
        } else {
            return
        }
        
    }
    function backDirHandler () {
        const backDir = dirStack.pop()
        dispatch(setCurrentDir(backDir))
    }
    function fileUploadHandler (event) {
        const files = [...event.target.files]

        files.forEach(file=>{
            dispatch(uploadFile(file, currentDir))
        })
    }

    function dragEnterHandler (e) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }
    function dragLeaveHandler (e) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }
    function dropHandler (e) {
        e.preventDefault()
        e.stopPropagation()
        let files = [...e.dataTransfer.files]

        files.forEach(file=>{
            dispatch(uploadFile(file, currentDir))
        })
        setDragEnter(false)
    }

    function searchInputHandler(e) {
        setSearch(e.target.value)
        dispatch(setSearchValue(search))
        
    }
    function searchFormHandler(e) {
        e.preventDefault()
        dispatch(searchFiles(search))
        setSearch("")
        dispatch(setSearchValue(""))
    }
    React.useEffect(()=>{
        
            dispatch(getFiles(currentDir, sort))

        
        
        
    }, [currentDir, sort])

    const arrowLeft = <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16"><path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" /></svg>
    const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg>
    const createDirIcon = <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-folder-plus" viewBox="0 0 16 16"><path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" /><path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" /></svg>
    const uploadFileIcon = <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-file-arrow-up" viewBox="0 0 16 16"><path d="M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z" /><path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" /></svg>


    return (
        loader ? <Loader></Loader> : 
        !dragEnter ? 
            <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                    <div className="disk__btn-row">
                        <button className="disk__btn btn btn-primary me-3 mb-2" onClick={backDirHandler}>{arrowLeft}</button>
                        <button className="disk__btn btn btn-primary me-3 mb-2" onClick={createDirHandler}>
                            <span className="disk__btn--icon">
                                {createDirIcon}
                            </span>
                            <span className="disk__btn--text">
                            Создать папку
                            </span>
                            
                            </button>
                        <label htmlFor="disk-upload" className="btn btn-primary disk__btn-upload me-3 mb-2">
                            <span className="disk__btn--icon">
                                {uploadFileIcon}
                            </span>
                            <span className="disk__btn--text">
                            Загрузить файл
                            </span>
                            
                            
                            <input type="file" multiple={true} id="disk-upload" className="disk__input-upload" onChange={(e)=>{fileUploadHandler(e)}} />
                        </label>
                        <select className="form-select disk__form-select me-3 mb-2" defaultValue=""  onChange={(e)=>{setSort(e.target.value)}}>
                            <option disabled value="">Сортировка</option>
                            <option value="name">По имени</option>
                            <option value="type">По типу</option>
                            <option value="date">По дате</option>
                        </select>
                        <form className="input-group disk__search mb-2" onSubmit={(e)=>{searchFormHandler(e)}}>
                            <input type="text" className="form-control disk__search-input" placeholder="Поиск" aria-label="Поиск" value={search} onChange={searchInputHandler} />
                            <button className="btn btn-primary" type="submit" id="button-addon2">{searchIcon}</button>
                        </form>
                    </div>
                    <FileList></FileList>
                    <Uploader></Uploader>
            </div>
        :
            <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <div className="drop-area__inner">
                    Перетащите файлы сюда
                </div>
            </div>
    )
}

export default Disk