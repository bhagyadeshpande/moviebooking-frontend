import React from 'react';
import '../App.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Footer = () =>{  
    return(
        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h4 className="white-text" style={{margin:'auto'}}>Enjoy online ticket booking at your city with us</h4>
                <p className="grey-text text-lighten-4">If you are planning for movie ticket bookings at your city, don't look any further. Now it is easy to get on with our online ticket booking system. Your one-stop solution for movies to watch this weekend. Don't wait anymore and book your movie tickets from us at the best price! Your access to your favourite movie in your city is just one click away!</p>
              </div>
              </div>
              <div className="row">
              <div className="col l4 offset-l2 s12" style={{textAlign:'center'}}>
              <div className="footer-align">- Book Your Movie -</div>
              </div>
              </div>
              <div className="row footer-div">
              <div className="col l4 offset-l2 s12" style={{textAlign:'center'}}>
              <ul style={{listStyleType:'none', display:'inline-flex'}}>
              <li><a href="#!"><ContactPhoneOutlinedIcon style={{fontSize:'xxx-large'}}/></a></li>             
              </ul>     
              <div>24/7 CUSTOMER CARE</div>         
              </div>
              </div>              
              <div className="row">
              <div className="col l4 offset-l2 s12" style={{textAlign:'center'}}>
              <ul style={{listStyleType:'none', display:'inline-flex'}}>
              <li style={{padding:'5px 10px'}}><a href="#!"><FacebookIcon /></a></li>
              <li style={{padding:'5px 10px'}}><a href="#!"><InstagramIcon /></a></li>
              <li style={{padding:'5px 10px'}}><a href="#!"><TwitterIcon /></a></li>
              <li style={{padding:'5px 10px'}}><a href="#!"><YouTubeIcon /></a></li>      
              <li style={{padding:'5px 10px'}}><a href="#!"><MailOutlineIcon /></a></li>                     
              </ul>
              </div>
              </div>            
          </div>
          <div className="footer-copyright">
            <div className="container">
            All Rights Reserved. Copyright 2021 © Bhagyarekha Deshpande 
            </div>
          </div>
        </footer>
    )
}

export default Footer;