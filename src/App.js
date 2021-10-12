import React, { createContext,useReducer } from 'react';
import {BrowserRouter} from "react-router-dom";
import NavBar from './components/NavBar';
import Routing from './components/Routing';
/*import Login from './components/screen/Login';
import Signup from './components/screen/Signup';
import CreateMovie from './components/screen/CreateMovie';
import Home from './components/screen/Home';
import Booking from "./components/screen/Booking";
import Mybooking from './components/screen/Mybooking';*/
import Footer from './components/Footer';
/*import User from './components/screen/User';
import Payment from './components/screen/Payment';
import CurrentUser from './components/screen/CurrentUser'*/
import {reducer,initialState} from './reducer/useReducer';

export const UserContext = createContext();

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar />
    <Routing />    
    <Footer />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
