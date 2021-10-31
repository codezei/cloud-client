import "./Navbar.scss"
import {Link, NavLink} from "react-router-dom"
import{useDispatch, useSelector} from "react-redux"
import {logout} from "../../reducers/userReducer"
import Profile from "../profile/Profile"

function Navbar () {
    const isAuth = useSelector(state=>{return state.user.isAuth})
    const dispatch = useDispatch()
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container">
                <div className="navbar__inner d-flex justify-content-between">
                    <Link to="/" className="navbar-brand">Cloud</Link>
                    <div>
                        {!isAuth && <NavLink to="/login" className="btn btn-outline-light me-3">Войти</NavLink>}
                        {!isAuth && <NavLink to="/registration" className="btn btn-outline-light">Регистрация</NavLink>}
                        {isAuth && <button type="button" className="btn btn-outline-light" onClick={()=>{dispatch(logout())}}>Выход</button>}
                        {isAuth && <Profile></Profile>}
                    </div>
                </div>
                
            </div>
        </nav>
    )
}

export default Navbar;