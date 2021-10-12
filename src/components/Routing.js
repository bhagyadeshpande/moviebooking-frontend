import React,{useContext, useEffect} from 'react';
import Login from './screen/Login'
import Signup from './screen/Signup';
import CreateMovie from './screen/CreateMovie';
import Home from './screen/Home';
import Booking from "./screen/Booking";
import Mybooking from './screen/Mybooking';
import {Route,Switch, useHistory} from "react-router-dom";
import {UserContext} from '../App'
import User from './screen/User';
import Payment from './screen/Payment';
import CurrentUser from './screen/CurrentUser'
import '../App.css'

const Routing = () => {

  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push("/")
    }else{
      history.push("/login")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
    <Switch >
      <Route exact path="/"><Home /></Route>
      <Route path="/login"><Login /></Route>
      <Route path="/alluser"><User /></Route>
      <Route path="/signup"><Signup /></Route>
      <Route path="/payment"><Payment /></Route>
      <Route path="/createmovie"><CreateMovie /></Route>
      <Route path="/currentuser"><CurrentUser /></Route>
      <Route path="/bookedmovies"><Booking /></Route>
      <Route path="/mybooking"><Mybooking /></Route>
    </Switch>
  )
}

export default Routing;