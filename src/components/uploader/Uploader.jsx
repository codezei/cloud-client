import { useDispatch, useSelector } from "react-redux";
import { hideUploader } from "../../reducers/uploadReducer";
import "./Uploader.scss"
import UploadFile from "./uploadFile/UploadFile";


function Uploader () {
    const files = useSelector(state=>state.upload.files)
    const isVisible = useSelector(state=>state.upload.isVisible)
    const dispatch = useDispatch()

    function closeUploaderHandler () {
        dispatch(hideUploader())
    }


    return (
        isVisible && 
        <div className="modal uploader">
            <div className="modal-dialog uploader__dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Загрузка</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeUploaderHandler} />
                    </div>
                    <div className="modal-body uploader__body">
                        {
                            files.map((file)=>{
                                return <UploadFile key={file.id} file={file}></UploadFile>
                            })
                        }

                    </div>
                </div>
            </div>
        </div>


    )
}

export default Uploader;

