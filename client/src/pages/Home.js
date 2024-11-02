import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import Navbar from '../components/Navbar';


function Home() {
   const navigate = useNavigate();


   // State for filter values
   const [filters, setFilters] = useState({
       gender: '',
       minAge: '',
       maxAge: '',
       dischargedToHospital: ''
   });


   // State for active filters
   const [activeFilters, setActiveFilters] = useState({
       gender: false,
       age: false,
       dischargedToHospital: false,
   });


   // Update filter values when input changes
   const handleFilterChange = (e) => {
       const { name, value } = e.target;
       setFilters((prevFilters) => ({
           ...prevFilters,
           [name]: value,
       }));
   };


   // Toggle active state for filters
   const handleFilterToggle = (e) => {
       const { name, checked } = e.target;
       setActiveFilters((prev) => ({
           ...prev,
           [name]: checked,
       }));
   };


   // Clear all filters
   const clearFilters = () => {
       setFilters({
           gender: '',
           minAge: '',
           maxAge: '',
           dischargedToHospital: ''
       });
       setActiveFilters({
           gender: false,
           age: false,
           dischargedToHospital: false,
       });
   };


   // Mock data for patients
   const data = [
       { id: 1, name: 'Person1', age: 25, gender: 'Female', dischargedToHospital: 'Yes' },
       { id: 2, name: 'Person2', age: 30, gender: 'Male', dischargedToHospital: 'No' },
       { id: 3, name: 'Person3', age: 35, gender: 'Male', dischargedToHospital: 'Yes' },
       { id: 4, name: 'Person4', age: 40, gender: 'Female', dischargedToHospital: 'No' },
   ];

      // Navigate to data visualization page
    const handleDataVisualClick = () => {
        console.log(data)
       navigate("/datavisual", {state: data});
   };


   // Navigate to analytics page
   const handleAnalyticClick = () => {
        console.log(data)
       navigate("/analytics", {state: data});
   };


   // Filter data based on active filters
   const filteredData = data.filter(item => {
       const { gender, minAge, maxAge, dischargedToHospital } = filters;
       const matchesGender = gender ? item.gender === gender : true;
       const matchesDischarged = dischargedToHospital ? item.dischargedToHospital === dischargedToHospital : true;
       const matchesAge = (minAge !== '' ? item.age >= parseInt(minAge) : true) &&
                          (maxAge !== '' ? item.age <= parseInt(maxAge) : true);
       return matchesGender && matchesDischarged && matchesAge;
   });


   return (
       <>
           {/* Render Navbar */}
           <Navbar />
           <div className="container">
               {/* Create a layout with columns */}
               <div className="columns is-vcentered">
                   {/* Filter section */}
                   <div className="column is-one-third">
                       <div className="box">
                           <h2 className="title is-4">Filters</h2>


                           {/* Gender filter */}
                           <div className="field">
                               <input
                                   type="checkbox"
                                   name="gender"
                                   className="checkbox"
                                   checked={activeFilters.gender}
                                   onChange={handleFilterToggle}
                               />
                               <label className="ml-2">Gender</label>
                               {activeFilters.gender && (
                                   <div className="control">
                                       <div className="select">
                                           <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                                               <option value="">Select Gender</option>
                                               <option value="Female">Female</option>
                                               <option value="Male">Male</option>
                                               <option value="Nonbinary">Nonbinary</option>
                                               <option value="Unknown">Unknown</option>
                                           </select>
                                       </div>
                                   </div>
                               )}
                           </div>


                           {/* Age filter */}
                           <div className="field">
                               <input
                                   type="checkbox"
                                   name="age"
                                   className="checkbox"
                                   checked={activeFilters.age}
                                   onChange={handleFilterToggle}
                               />
                               <label className="ml-2">Age</label>
                               {activeFilters.age && (
                                   <>
                                       <div className="control">
                                           <input
                                               type="number"
                                               name="minAge"
                                               className="input"
                                               placeholder="Min Age"
                                               value={filters.minAge}
                                               onChange={handleFilterChange}
                                           />
                                       </div>
                                       <div className="control">
                                           <input
                                               type="number"
                                               name="maxAge"
                                               className="input"
                                               placeholder="Max Age"
                                               value={filters.maxAge}
                                               onChange={handleFilterChange}
                                           />
                                       </div>
                                   </>
                               )}
                           </div>


                           {/* Discharged to Hospital filter */}
                           <div className="field">
                               <input
                                   type="checkbox"
                                   name="dischargedToHospital"
                                   className="checkbox"
                                   checked={activeFilters.dischargedToHospital}
                                   onChange={handleFilterToggle}
                               />
                               <label className="ml-2">Discharged To Hospital?</label>
                               {activeFilters.dischargedToHospital && (
                                   <div className="control">
                                       <div className="select">
                                           <select name="dischargedToHospital" value={filters.dischargedToHospital} onChange={handleFilterChange}>
                                               <option value="">Select Status</option>
                                               <option value="Yes">Yes</option>
                                               <option value="No">No</option>
                                           </select>
                                       </div>
                                   </div>
                               )}
                           </div>


                           {/* Clear Filters button */}
                           <button className="button is-danger" onClick={clearFilters}>Clear Filters</button>
                       </div>
                   </div>


                   {/* Patient records section */}
                   <div className="column">
                       <h1 className="title is-3 has-text-centered">Patient Records</h1>
                       {filteredData.length === 0 ? (
                           <p>No data matches your filters.</p>
                       ) : (
                           <div className="box">
                               <table className="table is-fullwidth is-striped">
                                   <thead>
                                       <tr>
                                           <th>ID</th>
                                           {activeFilters.gender && <th>Gender</th>}
                                           {activeFilters.age && <th>Age</th>}
                                           {activeFilters.dischargedToHospital && <th>Discharged to Hospital</th>}
                                           <th>Name</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                       {filteredData.map(item => (
                                           <tr key={item.id}>
                                               <td>{item.id}</td>
                                               {activeFilters.gender && <td>{item.gender}</td>}
                                               {activeFilters.age && <td>{item.age}</td>}
                                               {activeFilters.dischargedToHospital && <td>{item.dischargedToHospital}</td>}
                                               <td>{item.name}</td>
                                           </tr>
                                       ))}
                                   </tbody>
                               </table>
                           </div>
                       )}
                       {/* Navigation buttons */}
                       <div className="buttons has-text-centered mt-3">
                           <button className="button is-link" onClick={handleDataVisualClick}>Go To Data Visual</button>
                           <button className="button is-info" onClick={handleAnalyticClick}>Go To Analytics</button>
                       </div>
                   </div>
               </div>
           </div>
       </>
   );
}


export default Home;
