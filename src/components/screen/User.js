/* eslint-disable no-unused-vars */
import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App'
import M from 'materialize-css'

const User = () => {
  const BASE_URL = "http://localhost:5000";
  //const BASE_URL = "https://tktbooking.herokuapp.com";
  
  const {state,dispatch} = useContext(UserContext);
  const [data,setData] = useState([]);
  useEffect(()=>{
    fetch(`${BASE_URL}/user/alluser`,{
      headers: {
        "Authorization":"Bearer "+ JSON.parse(localStorage.getItem("jwt"))
      }
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result.user)
      setData(result.user)
    }).catch(err=>{
      console.log(err);
    })

  },[])

  const DeleteUser = (userid) =>{
    fetch(`${BASE_URL}/user/${userid}`,{
      method:'delete',
      headers:{
        "Authorization":"Bearer "+ JSON.parse(localStorage.getItem("jwt"))
      }
    }).then(res => res.json())
    .then(result=>{
        if(result.error){
            console.log(result.error)
            M.toast({html:result.error,classes:"#c62828 red darken-3"})
        }else{
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData);
            M.toast({html:"User Removed",classes:"#43a047 green darken-1"})
        }
    })
  }

    return(
      <>
        <div className="heading"><h1 className="heading-text">All Users</h1>
        <table className="highlight" >
         <thead>
          <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Delete User</th>
          </tr>
        </thead>
        {
          data.map(item=>{
            return(
              <tbody key={item._id} style={{textAlign:'center'}}>
              <tr>
                <td style={{padding:'10px 20px'}}>{item.name}</td>
                <td style={{padding:'10px 20px'}}>{item.role === 1?"Admin":"User"}</td>
                <td style={{padding:'10px 20px'}}>{item.email}</td>               
                <td style={{padding:'10px 20px'}}>{item.role === 0?<button onClick={()=>DeleteUser(item._id)}>delete</button>:""}</td> 
              </tr>
            </tbody>
            )
          })
        }       
    
      </table>
      </div>
      </>
    )
}

export default User;