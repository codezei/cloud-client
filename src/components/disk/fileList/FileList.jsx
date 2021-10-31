import React from 'react'
import { useSelector } from 'react-redux'
import File from './file/File'
import "./FileList.scss"
import {TransitionGroup, CSSTransition} from "react-transition-group"

function FileList () {

    let files = useSelector(state=>{return state.files.files})

    if (files.length === 0) {
        return (
            <div className="file-list--empty">
                Папка пуста
            </div>
        )
    }
    return (
        <div className="file-list">
            <div className="file-list__header row">
                <div className="col-1 col-xl-1"></div>
                <div className="col-5 col-xl-7">Название</div>
                <div className="col-3 col-xl-2">Дата</div>
                <div className="col-3 col-xl-2">Размер</div>
            </div>
            <div className="file-list__inner">
                <TransitionGroup>
                    {files.map(file=>{
                        return <CSSTransition key={file._id} timeout={500} classNames={"file"} exit={false}>
                            <File file={file}  ></File>
                        </CSSTransition>
                    })}
                </TransitionGroup>

            </div>
        </div>
    )
}

export default FileList