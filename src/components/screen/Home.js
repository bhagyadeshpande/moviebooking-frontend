/* eslint-disable no-unused-vars */
import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App';
import '../../App.css';
import M from 'materialize-css';
import {useHistory,Link} from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    const {state,dispatch} = useContext(UserContext);
    const [data,setData] = useState([]);
    const [seat,setSeat] = useState(0);
    const [total,setTotal] = useState(0);
    //const BASE_URL = "http://localhost:5000";
    const BASE_URL = "https://tktbooking.herokuapp.com";
    //  console.log(state);
    useEffect(()=>{
        fetch(`${BASE_URL}/movie/allmovies`,{
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())        
        .then(result=>{                    
             setData(result.movies);
        }).catch((err)=>{
            console.log(err);
        })
    }, [])


    const deleteMovie = (movieid) =>{
        fetch(`${BASE_URL}/movie/${movieid}`,{
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
            }
        })

    }

    return(
    <div>
    <div className="main-heading"><h1>WELCOME TO THE ONLINE TICKET BOOKING SYSTEM</h1></div>
    <div className="heading"><h1 className="heading-text">MOVIES</h1></div>
    {
    data.map((item, key) =>{
    return (                        
    <div className="card homecard col s6" style={ { textAlign:"center"}} key={item._id} >
    {
    state.role === 1?<button
    onClick={()=>deleteMovie(item._id)}
    >delete</button>:""
    }
    {/* <i className="material-icons small right" */}
    <div className="card-img" style={{textAlign:'center'}}>
    <img style={{margin: "5px auto", maxWidth:"350px",height: "400px"}} src={item.photo} alt="" />
    </div>
    <div className="card-content movieCard">
    <span className="card-title"><h4>{item.title}</h4></span>
    <div className="moviePara"> 
        <p>Genre : {item.generes}</p>              
        <p>Directed By : {item.director}</p>
        <p>{item.description}</p>
        <p>Cast : {item.cast}</p>
        <p>Duration : {item.time} </p>
        <p>Price : {item.price} ₹</p>
        </div>               
        <button className="btn"  style={{marginTop:"10px"}}
        onClick={()=>localStorage.setItem("movie",JSON.stringify(item._id))}
        ><Link to="/payment" style={{color:"white", textDecoration:'none'}}>Book</Link></button>
        </div>
        </div>
     )
    })
     }         
  </div>    
    )
}

export default Home;