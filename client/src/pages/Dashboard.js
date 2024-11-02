import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import Navbar from '../components/Navbar';

const DatabaseSelector = () => {
   const navigate = useNavigate();

   const handleHomeClick = () => {
       navigate("/home");
   };

   return (
       <>
           <Navbar />
           <div className="container">
               <h1 className="title is-3 has-text-centered">Choose a Database</h1>
               <div className="columns is-multiline">
                   {/* EHR Database Tile */}
                   <div className="column is-one-third">
                       <div className="box has-text-centered" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                           <h2 className="title is-4">EHR Report</h2>
                           <p>View EHR report data</p>
                       </div>
                   </div>

                   {/* Database Tile 2 */}
                   <div className="column is-one-third">
                       <div className="box has-text-centered">
                           <h2 className="title is-4">Database 2</h2>
                           <p>Description about Database 2</p>
                       </div>
                   </div>

                   {/* Database Tile 3 */}
                   <div className="column is-one-third">
                       <div className="box has-text-centered">
                           <h2 className="title is-4">Database 3</h2>
                           <p>Description about Database 3</p>
                       </div>
                   </div>

                   {/* Database Tile 4 */}
                   <div className="column is-one-third">
                       <div className="box has-text-centered">
                           <h2 className="title is-4">Database 4</h2>
                           <p>Description about Database 4</p>
                       </div>
                   </div>

                   {/* Database Tile 5 */}
                   <div className="column is-one-third">
                       <div className="box has-text-centered">
                           <h2 className="title is-4">Database 5</h2>
                           <p>Description about Database 5</p>
                       </div>
                   </div>

                   {/* Database Tile 6 */}
                   <div className="column is-one-third">
                       <div className="box has-text-centered">
                           <h2 className="title is-4">Database 6</h2>
                           <p>Description about Database 6</p>
                       </div>
                   </div>
               </div>
           </div>
       </>
   );
};

export default DatabaseSelector;
