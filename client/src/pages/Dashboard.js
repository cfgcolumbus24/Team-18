import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import Navbar from '../components/Navbar';
import ehrImage from '../components/ehrPicture.png';
import hrisImage from '../components/HRISPicture.png';
import hotlineImage from '../components/988.png';
import phone from '../components/phone.png';
import finances from '../components/finances.png';

const DatabaseSelector = () => {
 const navigate = useNavigate();

 const handleHomeClick = () => {
     navigate("/home");
 };

 return (
     <>
         <Navbar />
         <div className="container">
             <h1 className="title is-3 has-text-centered">Choose Your Patient's Journey</h1>
             <div className="columns is-multiline">
                 {/* EHR Database Tile */}
                 <div className="column is-one-third">
                     <div className="box has-text-centered" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                         <h2 className="title is-4">EHR System</h2>
                         <div style={{ width: '250px', height: '150px', overflow: 'hidden', margin: '0 auto' }}>
                         <img src={ehrImage} alt="EHR tile" style={{ maxWidth: '100%', height: 'auto' }} />
                         </div>
                         <p style={{marginTop: '10px'}}>View data from electronic health records</p>
                     </div>
                 </div>

                 {/* Financial Database */}
                 <div className="column is-one-third">
                     <div className="box has-text-centered">
                         <h2 className="title is-4">Financial System</h2>
                         <div style={{ width: '250px', height: '150px', overflow: 'hidden', margin: '0 auto' }}>
                              <img src={finances} alt="HRIS tile" style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }} />
                         </div>
                         <p style={{marginTop: '10px'}}>Gather information on financial reports, assess budgets</p>
                     </div>
                 </div>

                 {/* HRIS Database */}
                 <div className="column is-one-third">
                     <div className="box has-text-centered">
                         <h2 className="title is-4">HRIS System</h2>
                         <div style={{ width: '250px', height: '150px', overflow: 'hidden', margin: '0 auto' }}>
                              <img src={hrisImage} alt="HRIS tile" style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }} />
                         </div>
                         <p style={{marginTop: '10px'}}>View employee records and management tools</p>
                     </div>
                 </div>

                  {/* Call logs Database */}
                  <div className="column is-one-third">
                     <div className="box has-text-centered">
                         <h2 className="title is-4">Phone System</h2>
                         <div style={{ width: '250px', height: '150px', overflow: 'hidden', margin: '0 auto' }}>
                              <img src={phone} alt="HRIS tile" style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }} />
                         </div>
                         <p style={{marginTop: '10px'}}>View past call logs between patients and clinicians</p>
                     </div>
                 </div>

                 {/* 988 Database */}
                 <div className="column is-one-third">
                     <div className="box has-text-centered">
                         <h2 className="title is-4">988 System</h2>
                         <div style={{ width: '250px', height: '150px', overflow: 'hidden', margin: '0 auto' }}>
                              <img src={hotlineImage} alt="HRIS tile" style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover'}} />
                         </div>
                         <p style={{marginTop: '10px'}}>See chat metrics from the 988 Suicide & Crisis Lifeline</p>
                     </div>
                 </div>
             </div>
         </div>
     </>
 );
};

export default DatabaseSelector;