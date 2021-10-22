/* eslint-disable no-unused-vars */
import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from '../../App';
// import '../../Style'
import '../../App.css';
import M from 'materialize-css'
import {useHistory, Redirect} from 'react-router-dom';

const Payment = (props) => {
    const history = useHistory();
    const {state,dispatch} = useContext(UserContext);
    const [seat,setSeat] = useState(0);
    const [total,setTotal] = useState(0);
    const[cardDetail, setCardDetail] = useState({
        cardName:'',cardNum:'',cvvNum:'',expDate:''});
    const movieid = JSON.parse(localStorage.getItem("movie"))
    // console.log(typeof(movieid));
    const BASE_URL = "http://localhost:5000";
    //const BASE_URL = "https://tktbooking.herokuapp.com";
    
    const [data,setData] = useState([])
    

    useEffect(()=>{
        fetch(`${BASE_URL}/movie/${movieid}`,{
            headers:{
                "Authorization":"Bearer "+ JSON.parse(localStorage.getItem("user"))
            }
        }).then(res=>res.json())
        .then(movie=>{
            // console.log(movie.movie)
            setData(movie.movie)
        }).catch(err=>{
            console.log(err)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])    

    const bookeMovie = (movieid) => {        
        
         fetch(`${BASE_URL}/bookmovie/${movieid}`,{
             method:'post',
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+ JSON.parse(localStorage.getItem("jwt"))
             },
             body:
                JSON.stringify({     
                ...cardDetail,              
                 seat,
                 total,                 
            })
         }).then(res=>res.json())
         .then(result=>{                                
             if(result.error){
                   M.toast({html:result.error,classes:"#c62828 red darken-3"})
              } 
              else{                                  
            alert(`Congratulations ${cardDetail.cardName}, your booking is successful!`);
            history.push("/mybooking") ; 
            //M.toast({html:"Booked Successfully", classes:"#43a047 green darken-1"})                 
            }    
        }).catch(err=>{
             console.log(err);
         })
     }

    return(       
            <>
            <div className="card paycard col s6 m6 l6">
            <div className="card-image">
            <img style={{margin: "5px auto", maxWidth:"350px",height: "400px"}} src={data.photo} alt="" />
            <div className="card-content">
                <h1>{data.title}</h1>
            <h5>{data.description}</h5>
            </div>
            </div>
            </div> 
            <div className="container right col s6 m6 l6" style={{margin: "50px", 
            border:"2px solid gray",
            borderRadius:"10px",
             padding:"10px",
             textAlign:'center'}}>
                <h1>Payment Details</h1>               
                <form>                
                <p>Number of Seats</p>
                <input style={{maxWidth: "100px"}} type="number" 
                placeholder="seat"
                required
                onChange={(e)=>{
                setSeat(e.target.value);
                setTotal(data.price*e.target.value);
                }}
                />
                <h3 className="right" style={{color:"black"}}>Total:{total}</h3>
                
                <input
                type="text"                
                placeholder="Full Name"
                required  
                onChange = {(e)=>setCardDetail({...cardDetail, cardName:e.target.value})}          
                />
                <input
                type="text"                
                placeholder="card number"
                required
                onChange = {(e)=>setCardDetail({...cardDetail, cardNum:e.target.value})}  
                />                
                <input
                type="text"                
                placeholder="cvv number"  
                required
                onChange = {(e)=>setCardDetail({...cardDetail, cvvNum:e.target.value})}          
                />
                <input type="text"                                   
                placeholder = "expiry date : dd/mm/yyyy"
                required
                onChange = {(e)=>setCardDetail({...cardDetail, expDate:e.target.value})}  
                />
                <button type="submit" className="btn" style={{marginTop:"10px"}}
                onClick={()=>{  
                bookeMovie(data._id)
                }}>     
                     Pay Rs. {total}
                  {/* <Link to = "/mybooking" id="paymentLink">  Pay Rs. {total}</Link>    */}
                </button>                
                 </form>
            </div>    
            </>    
    )
}

export default Payment;