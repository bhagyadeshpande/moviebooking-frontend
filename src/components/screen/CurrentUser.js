import React,{useContext} from 'react';
import {UserContext} from '../../App'

const CurrentUser = () => {
    // eslint-disable-next-line no-unused-vars
    const {state,dispatch} = useContext(UserContext);
//    console.log(state)
    return(
        <div>
            <h3>Name : {state.name}</h3>
            <h3>Email : {state.email}</h3>
            <h3>Role : {state.role === 0?"User":"Admin"}</h3>
        </div>
    )
}

export default CurrentUser;

