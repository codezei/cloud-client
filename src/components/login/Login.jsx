
import React from 'react'
import {login} from "../../actions/user"
import {useDispatch} from "react-redux"


function Login () {
    const [userData, setUserData] = React.useState({
        email: "",
        password: ""
    })

    function inputHandler (e) {
        setUserData({...userData, [e.target.name]: e.target.value})
    }
    const dispatch = useDispatch()
    return (

        <div className="row justify-content-center form-wrap">
            <div className="col-xl-6">
                <form className="form" onSubmit={(e)=>{
                    e.preventDefault()

                    dispatch(login(userData['email'], userData['password']))
                }}>
                    <h3 className="form__title text-center">Авторизация</h3>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail" name="email" onChange={inputHandler} value={userData["email"]} required autoComplete="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Пароль</label>
                        <input type="password" className="form-control" id="inputPassword" name="password" onChange={inputHandler} value={userData["password"]} required minLength={3} maxLength={12} autoComplete="current-password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Войти</button>
                </form>
            </div>
        </div>

    )
}

export default Login