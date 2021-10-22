/* eslint-disable no-unused-vars */
import React,{useEffect,useContext, useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../../App';
import "../../App.css";
import M from 'materialize-css'

const Booking = () => {
    //const BASE_URL = "http://localhost:5000";
    const BASE_URL = "https://tktbooking.herokuapp.com";
    const {state,dispatch} = useContext(UserContext);
    const [data,setData] = useState([]);
    const history = useHistory();
    useEffect(()=>{
        fetch(`${BASE_URL}/bookmovie/allbookedmovies`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{            
            setData(result.allbookedmovie);
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const deleteMovie = (movieid) =>{
        fetch(`${BASE_URL}/bookmovie/${movieid}`,{
            method:'delete',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
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
                M.toast({html:"Movie Removed",classes:"#43a047 green darken-1"})
                history.push("/");
            }
        })
    }

    return(              
        <>        
        <div className="heading"><h1 className="heading-text">All Booking</h1></div>
        {            
        data.map((item,key)=>{
        return(
        <div key={key} className="card homecard col s6" style={ { textAlign:'center' }}>
        {
        state.role === 1?<button
        onClick={()=>deleteMovie(item._id)}>
        delete</button>:""
        }
        <div className="card-img">
        <img style={{marginTop: "5px", maxWidth:"350px",height: "400px"}} src={item.movie.photo} alt=""></img>
        </div>
        <div className="card-content">
        <h5>{item.movie.title}</h5>
        <h6>Director:-{item.movie.director}</h6>
        <p><strong>User Details</strong></p>
        <p>Name : {item.bookedby.name} || Email : {item.bookedby.email} </p>
        <p><strong>seat</strong> : {item.seat} </p>
        <p><strong>total</strong> : {item.total} ₹</p>
        </div>
        </div>
            )
        })
        }            
        </>
    )
}

export default Booking;