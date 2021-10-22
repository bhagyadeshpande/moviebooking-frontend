import React,{useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import '../../App.css'
import {UserContext} from '../../App';
import M from 'materialize-css';

const Login = () =>{
    // eslint-disable-next-line no-unused-vars
    const {state,dispatch} = useContext(UserContext);
    const history = useHistory();
    const [password,setPassword] = useState("");
    const[email, setEmail] = useState("");
    //const BASE_URL = "http://localhost:5000";
    const BASE_URL = "https://tktbooking.herokuapp.com";
    
    const PostData = () =>{        
        // if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        //     M.toast({html:"Invalid email",classes:"#c62828 red darken-3"})
        //     return;
        // }
        fetch(`${BASE_URL}/auth/signin`,{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email,password
            })
        }).then(res=>res.json())
        .then(data=>{           
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }
            else{                
                localStorage.setItem("jwt",JSON.stringify(data.token))
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:JSON.stringify(data.user)})
                M.toast({html:"Signedin Success",classes:"#43a047 green darken-1"})
                history.push("/")
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    return(        
         <div className="card auth-card">
           <h1 style={{backgroundColor:'darkslateblue'}}>Welcome to the Movie Ticket Booking System</h1>
           <form className="logInForm">
               <label htmlFor="uemail" className="logInLabel"><b>Email</b></label>
            <input type="text" 
            placeholder="email"
            name="uemail"
            value={email}
            required
           onChange={(e)=>setEmail(e.target.value)} 
            />
           <label htmlFor="pwd" className="logInLabel"><b>Password</b></label>
            <input type="password"
            placeholder="password"
            name="pwd"
            required
            value={password}
           onChange={(e)=>setPassword(e.target.value)} 
            />
           <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
           onClick={PostData}
           >Login </button>
           <h4>
        <Link to="/signup" style={{color:'bisque', textDecoration:'none'}}>Don't have an account ?</Link>
         </h4>
         </form>
        </div>        
    )
}

export default Login;