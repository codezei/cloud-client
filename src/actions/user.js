import axios from "axios"
import { logout, setUser } from "../reducers/userReducer"
import {API_URL} from "../config"



const registration = async (email, password)=>{
    try {

        const response = await axios.post(`${API_URL}api/auth/registration`, {email, password})

        

        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}   

const login =  (email, password)=>{
    return async (dispatch) => {
        try {

            const response = await axios.post(`${API_URL}api/auth/login`, {email, password})
            localStorage.setItem('token', response.data.token)
            dispatch(setUser(response.data))
           
           
        } catch (e) {
            alert(e.response.data.message)
        }
    }

} 

const auth = ()=>{

    return async (dispatch) => {
        try {
            if (!localStorage.getItem('token')) {
                return
            }
            const response = await axios.get(`${API_URL}api/auth/auth`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
    
           dispatch(setUser(response.data))
        } catch (e) {
            dispatch(logout())
            console.log(e.response.data.message)
        }
    }
} 



export {registration, login, auth}