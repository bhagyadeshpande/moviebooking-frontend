import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import '../../App.css'
import M from 'materialize-css';
//const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://tktbooking.herokuapp.com";

const Signup = () =>{

    const history = useHistory();
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const PostData = () =>{
        // eslint-disable-next-line no-useless-escape
   if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    M.toast({html:"Invalid email",classes:"#c62828 red darken-3"})
    }
    fetch(`${BASE_URL}/auth/signup`,{    
    method: 'post',
    headers: { 
    "Content-Type": "application/json"
    },
    body:JSON.stringify({
        name,
        email,
        password
        })
        }).then(res=>res.json())
        .then(data=>{            
            if(data.error){
              // M.toast({html:data.error,classes:"#c62828 red darken-3"})
              console.log(data.error);
            }else{
               //M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push("/login")
            }
        }).catch((err) =>{
            console.log(err)
       })
    }

    return(
        <div className="mycard" >
         <div className="card auth-card input-field">
           <h2>Register Here</h2>
           <form className="logInForm">
          <label htmlFor="uname" className="logInLabel">Name</label>
           <input type="text" 
            placeholder="name"
            name="uname"
            valuse={name}
            required
            onChange={(e)=>setName(e.target.value)} 
            />
            <label htmlFor="userEmail" className="logInLabel">Email</label>
            <input type="text" 
            placeholder="email"
            name="userEmail"
            valuse={email}
            required
            onChange={(e)=>setEmail(e.target.value)} 
            />
            <label htmlFor="userPwd" className="logInLabel"><b>Password</b></label>
            <input type="password"
            placeholder="password" 
            name="userPwd"
            valuse={password}
            required
            onChange={(e)=>setPassword(e.target.value)}
            />
           <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
           onClick={()=>PostData()}
           >Signup </button>
           <h4>
             <Link to="/login" style={{color:'bisque', textDecoration:'none'}}>Already have an account ?</Link>
         </h4>
         </form>
        </div>
        </div>
    )
}

export default Signup;