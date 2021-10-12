import React,{useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../App'
import '../App.css'

const NavBar = () => {
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);
  const renderList = () => {
      
    if(state){
      if(state.role === 1){
        return ([ 
        <ul style={{listStyle:"none", textDecoration:"none"}}>
        <li><Link className="option" to="/currentuser">
          <i className="material-icons medium right option" >Profile </i>
          Details - {state.name}</Link></li>,
          <li ><Link className="option" to="/createmovie">Create Movie</Link></li>,
          <li ><Link className="option" to="/bookedmovies">Booked Movies</Link></li>,
          <li><Link className="option" to="/alluser">All Users</Link></li>,
          <li>
          <button className="btn2 #c62828 red darken-3"
            onClick={()=>{
              localStorage.clear();
              dispatch({type:"CLEAR"})
              history.push("/login")
            }}
            >Logout </button>
       </li></ul>        
        ])
      }else{
        return ([          
        // <li>
        //   <Link  to="/currentuser" style={{color:"black"}}>
        //     <i className="material-icons medium right">person_pin</i>
        //     <strong>{state.name}</strong>
        //   </Link>
        // </li>,
        <div className="userDiv">    
        
          <li><Link className="option" to="/mybooking">My Booking</Link></li>,
          <li style={{marginTop:'-18px'}}>
           <button className="btn1 #c62828 red darken-3"
             onClick={()=>{
               localStorage.clear();
               dispatch({type:"CLEAR"})
               history.push("/login")
             }}
             >Logout </button>
        </li>  </div>     
        ])
      }      
    }
    // else{
    //   return ( 
    //     <div>
    //       <ul style={{listStyleType:"none", margin:0, padding:0, display:'inline'}}>
    //     <li><Link className="option" to="/login">Login</Link></li>,
    //       <li><Link className="option" to="signup">SignUp</Link></li>
    //       </ul>  
    //       </div>          
    //   )
    // }
  }
    return(
    <div className="navbar-fixed">
      <nav style={{backgroundColor:"teal"}}>
        <div className="nav-wrapper">
          {/* <Link to={state?"/":"/login"} className="brand-logo left" style={{color:"#f44336"}}>MovieApp</Link> */}
          <ul id="nav-mobile" className="right hide-on-med-and-down" >         
            {renderList()}            
          </ul>
        </div>
      </nav>
      </div>
    )
}

export default NavBar;