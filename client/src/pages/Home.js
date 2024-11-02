import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
   const navigate = useNavigate();

   const [filters, setFilters] = useState({
       gender: '',
       minAge: '',
       maxAge: '',
       dischargedToHospital: ''
   });

   const [activeFilters, setActiveFilters] = useState({
       gender: false,
       age: false,
       dischargedToHospital: false,
   });

   const handleDataVisualClick = () => {
     navigate("/datavisual");
 }


   const handleAnalyticClick = () => {
       navigate("/analytics");
   };

   const handleReportClick = () => {
    navigate("/report");
};


   const handleFilterChange = (e) => {
       const { name, value } = e.target;
       setFilters((prevFilters) => ({
           ...prevFilters,
           [name]: value,
       }));
   };


   // update active filters
   const handleFilterToggle = (e) => {
       const { name, checked } = e.target;
       setActiveFilters((prev) => ({
           ...prev,
           [name]: checked,
       }));
   };


   // clear filters
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


   // mock data
   const data = [
       { id: 1, name: 'Person1', age: 25, gender: 'Female', dischargedToHospital: 'Yes' },
       { id: 2, name: 'Person2', age: 30, gender: 'Male', dischargedToHospital: 'No' },
       { id: 3, name: 'Person3', age: 35, gender: 'Male', dischargedToHospital: 'Yes' },
       { id: 4, name: 'Person4', age: 40, gender: 'Female', dischargedToHospital: 'No' },
   ];


   const filteredData = data.filter(item => {
       const { gender, minAge, maxAge, dischargedToHospital } = filters;
       const matchesGender = gender ? item.gender === gender : true;
       const matchesDischarged = dischargedToHospital ? item.dischargedToHospital === dischargedToHospital : true;
       const matchesAge = (minAge !== '' ? item.age >= parseInt(minAge) : true) &&
                          (maxAge !== '' ? item.age <= parseInt(maxAge) : true);
      
       return matchesGender && matchesDischarged && matchesAge;
   });


   // selectable filters
   return (
       <div style={{ display: 'flex' }}>
           <div style={{ marginRight: '20px', display: 'flex', flexDirection: 'column' }}>
               <h2>Filter</h2>
               <label>
                   <input
                       type="checkbox"
                       name="gender"
                       checked={activeFilters.gender}
                       onChange={handleFilterToggle}
                   />
                   Gender
               </label>
               {activeFilters.gender && (
                   <label>
                       Gender:
                       <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                           <option value="">Select Gender</option>
                           <option value="Female">Female</option>
                           <option value="Male">Male</option>
                           <option value="Nonbinary">Nonbinary</option>
                           <option value="Unknown">Unknown</option>
                       </select>
                   </label>
               )}


               <label>
                   <input
                       type="checkbox"
                       name="age"
                       checked={activeFilters.age}
                       onChange={handleFilterToggle}
                   />
                   Age
               </label>
               {activeFilters.age && (
                   <>
                       <label>
                           Min Age:
                           <input
                               type="number"
                               name="minAge"
                               value={filters.minAge}
                               onChange={handleFilterChange}
                           />
                       </label>
                       <label>
                           Max Age:
                           <input
                               type="number"
                               name="maxAge"
                               value={filters.maxAge}
                               onChange={handleFilterChange}
                           />
                       </label>
                   </>
               )}


               <label>
                   <input
                       type="checkbox"
                       name="dischargedToHospital"
                       checked={activeFilters.dischargedToHospital}
                       onChange={handleFilterToggle}
                   />
                   Discharged To Hospital?
               </label>
               {activeFilters.dischargedToHospital && (
                   <label>
                       Discharged To Hospital:
                       <select name="dischargedToHospital" value={filters.dischargedToHospital} onChange={handleFilterChange}>
                           <option value="">Select Status</option>
                           <option value="Yes">Yes</option>
                           <option value="No">No</option>
                       </select>
                   </label>
               )}


               <button onClick={clearFilters}>Clear Filters</button>
           </div>
           <div>
               <h1>Filtering</h1>
               <button onClick={handleDataVisualClick}>Data Visual</button>
               <button onClick={handleAnalyticClick}>Analytics</button>
               <button onClick={handleReportClick}>Export Report</button>

               <h2>Data Table</h2>
               {filteredData.length === 0 ? (
                   <p>No data matches your filters.</p>
               ) : (
                   <table border="1">
                       <thead>
                           <tr>
                               <th>ID</th>
                               {activeFilters.gender && <th>Gender</th>}
                               {activeFilters.age && <th>Age</th>}
                               {activeFilters.dischargedToHospital && <th>Discharged to Hospital</th>}
                               <th>Name</th> {/* always show name */}
                           </tr>
                       </thead>
                       <tbody>
                           {filteredData.map(item => (
                               <tr key={item.id}>
                                   <td>{item.id}</td>
                                   {activeFilters.gender && <td>{item.gender}</td>}
                                   {activeFilters.age && <td>{item.age}</td>}
                                   {activeFilters.dischargedToHospital && <td>{item.dischargedToHospital}</td>}
                                   <td>{item.name}</td> {/* always show name */}
                               </tr>
                           ))}
                       </tbody>
                   </table>
               )}
           </div>
       </div>
   );
}


export default Home;



