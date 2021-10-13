import React,{useContext, useEffect,useState} from  'react';
import {UserContext} from "../../App";
import M from 'materialize-css';
//import DeleteIcon from '@mui/icons-material/Delete';

const Mybooking = () =>{
    //const BASE_URL = "http://localhost:5000";
    const BASE_URL = "https://tktbooking.herokuapp.com";
    // eslint-disable-next-line no-unused-vars
    const {state,dispatch} = useContext(UserContext);
    const [data,setData] = useState([]);

    useEffect(()=>{
        fetch(`${BASE_URL}/bookmovie/mybookedmovies`,{
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
         console.log(result);
            setData(result.mymovie)
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const CancelBooking = (movieid) => { 
        fetch(`${BASE_URL}/bookmovie/delete/${movieid}`,{
            method:'delete',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            if(result.error){
                console.log(result.error)
                M.toast({html:result.error,classes:"#c62828 red darken-3"})
            }else{
                const newData = data.filter(item=>{
                    return item._id !== result._id
                })
                setData(newData)
                M.toast({html:"Cancled Movie",classes:"#43a047 green darken-1"})
                
            }
        })
    }

    return(
        <>      
        <div className="heading"><h1 className="heading-text">My Bookings</h1></div>        
            {
            data.map((item, key) => {
                return (                      
                <div key={key} className="card homecard col s6" style={ { textAlign:'center' }}>
                <button  onClick={()=>CancelBooking(item._id)}>               
                delete</button>
                <div className="card-img">
                <img style={{marginTop: "5px", maxWidth:"350px",height: "400px"}} src={item.movie.photo} alt="" />
                </div>                
                <div className="card-content bookedMovie">
                <h3>{item.movie.title} : <span className="right">{item.movie.generes}</span></h3>
                <h4>Directed by : {item.movie.director}</h4>
                <p><strong>Number of Seats</strong> : {item.seat}</p>                
                <p>Cost : {item.total} ₹</p>                
                </div>
                </div>
                )
})
}        
         </>      
    )
}

export default Mybooking;
