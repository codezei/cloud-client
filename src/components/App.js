import Navbar from "./navbar/Navbar"
import "./App.scss"
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import Registration from "./registration/Registartion.jsx"
import Login from "./login/Login.jsx"
import {useSelector, useDispatch} from "react-redux"
import React from 'react'
import {auth} from "../actions/user"
import Disk from "./disk/Disk"




function App() {
  const isAuth = useSelector(state=>{return state.user.isAuth})
  
  const dispatch = useDispatch()

  React.useEffect(()=>{
    
    dispatch(auth())

  }, [])
  return (
    <BrowserRouter>
      <div>
        <Navbar></Navbar>
        <main className="main">
          <div className="container">
            {
              !isAuth ? 
              <Switch>
                <Route path="/registration" component={Registration}></Route>
                <Route path="/login" component={Login}></Route>
                <Redirect to="/login"></Redirect>
              </Switch>
              :
              <Switch>
                <Route exact path="/" component={Disk}></Route>
                <Redirect to="/"></Redirect>
              </Switch>
            }
            
          </div>
        </main>

      </div>
    </BrowserRouter>

  );
}

export default App;
