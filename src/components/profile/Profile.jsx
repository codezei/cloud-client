import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadAvatar, deleteAvatar } from '../../actions/file'
import {API_URL} from "../../config"
import defaultAvatar from "../../assets/img/avatar.svg"

import "./Profile.scss"

function Profile () {
    const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg>
  
    const [showMenu, setShowMenu] = React.useState(false)
    const loader = useSelector(state=>{return state.app.loader})
    let user = useSelector(state=>{return state.user.currentUser}) || ""
    let avatar = user.avatar ? `${API_URL + user.avatar}` : defaultAvatar
    const dispatch = useDispatch()

    function showMenuHandler () {
        setShowMenu(true)
    }
    function hideMenuHandler () {
        setShowMenu(false)
    }
    function uploadAvatarHandler (e) {

        let file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    function deleteAvatarHandler () {
        dispatch(deleteAvatar())
    }

    return (
        <div className="profile ms-3">
            <div className="profile-img" onClick={showMenuHandler}>
                {!loader ? <img src={avatar} alt="" className="profile-img__img" /> : ""}  
            </div>
            <div className={`profile-menu ${showMenu ? 'profile-menu--open' : ''}`}>
                <label htmlFor="profile-upload" className="profile-menu__upload btn btn-outline-primary profile-menu__btn mb-3" onClick={uploadAvatar}>Загрузить</label>
                <input accept="image/*" type="file" className="profile-upload" id="profile-upload" onChange={(e)=>{uploadAvatarHandler(e)}} />
                <button className="profile-menu__delete btn btn-outline-primary profile-menu__btn" onClick={()=>{deleteAvatarHandler()}}>Удалить</button>
                <button className="profile-menu__close btn" onClick={hideMenuHandler}>{closeIcon}</button>
            </div>
            
        </div>
    )
}

export default Profile;