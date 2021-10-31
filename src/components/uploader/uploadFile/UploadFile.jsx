import "./UploadFile.scss"

function UploadFile ({file}) {
    return (
        <div className="upload-file">
            <p className="upload-file__name">{file.name}</p>
            <div className="progress upload-file__progress">
                <div className="progress-bar" role="progressbar" style={{width: file.progress + '%'}} aria-valuenow={file.progress} aria-valuemin={0} aria-valuemax={100}>{file.progress + '%'}</div>
            </div>
        </div>

    )
}

export default UploadFile