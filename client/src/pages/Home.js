import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import Navbar from '../components/Navbar';
import testData from './testData2.json';
import FileSaver from 'file-saver';
import { FaDownload } from "react-icons/fa";

function Home() {
   const navigate = useNavigate();


   // State for filter values
   const [filters, setFilters] = useState({
       gender: '',
       dischargeType: '',
       patientId: '',
       name: '',
       race: ''
   });


   // State for active filters - only keep checkable ones
   const [activeFilters, setActiveFilters] = useState({
       gender: true,
       dischargeType: true,
       race: true
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
       const { name } = e.target;
       setActiveFilters((prev) => ({
           ...prev,
           [name]: !prev[name],  // Toggle the specific filter
       }));
   };


   // Clear all filters
   const clearFilters = () => {
       setFilters({
           gender: '',
           dischargeType: '',
           patientId: '',
           name: '',
           race: ''
       });
   };


   // Accessing the patient data
   const data = testData.tables.patients;

      // Navigate to data visualization page
    const handleDataVisualClick = () => {
       navigate("/datavisual", {state: data});
   };

   // Navigate to analytics page
   const handleAnalyticClick = () => {
       navigate("/analytics", {state: data});
   };

    // Navigate to analytics page
    const handleReportClick = () => {
        navigate("/report", {state: data});
    };

   //CSV Parsing Code Tutorial: https://www.geeksforgeeks.org/how-to-create-and-download-csv-file-in-javascript/
   //Handle data export
   const handleExport = () => {
    const csvData = []
    const headers = Object.keys(data[0])
    csvData.push(headers.join(','))
    for (const row of data) {
        const values = headers.map(val => {
            return(row[val])
        });
        csvData.push(values.join(','))
    }
    const exportData = csvData.join("\n")

    const blob = new Blob([exportData], { type: "text/csv" });
    FileSaver.saveAs(blob, "patientData.csv");
   };

   // Filter data based on active filters
   const filteredData = data.filter(item => {
       const { gender, dischargeType, patientId, name, race } = filters;
       const matchesGender = activeFilters.gender ? (gender ? item.gender === gender : true) : true;
       const matchesDischargeType = activeFilters.dischargeType ? (dischargeType ? item.dischargeType === dischargeType : true) : true;
       const matchesPatientId = (patientId ? item.patientId.toString() === patientId : true);
       const matchesName = (name ? item.name.toLowerCase().includes(name.toLowerCase()) : true);
       const matchesRace = activeFilters.race ? (race ? item.race === race : true) : true;


       return matchesGender && matchesDischargeType && matchesPatientId && matchesName && matchesRace;
   });


   return (
       <>
           {/* Render Navbar */}
           <Navbar />
           <div className="container">
               {/* Create a layout with columns */}
               <div className="columns">
                   {/* Filter section */}
                   <div className="column is-one-third">
                       <div className="box">
                           <h2 className="title is-4">Filters</h2>


                           {/* Patient ID filter (uncheckable) */}
                           <div className="field">
                               <label className="ml-2">Patient ID</label>
                               <div className="control">
                                   <input
                                       type="text"
                                       name="patientId"
                                       className="input"
                                       placeholder="Enter Patient ID"
                                       value={filters.patientId}
                                       onChange={handleFilterChange}
                                   />
                               </div>
                           </div>


                           {/* Name filter (uncheckable) */}
                           <div className="field">
                               <label className="ml-2">Name</label>
                               <div className="control">
                                   <input
                                       type="text"
                                       name="name"
                                       className="input"
                                       placeholder="Enter Name"
                                       value={filters.name}
                                       onChange={handleFilterChange}
                                   />
                               </div>
                           </div>


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
                               <div className="control">
                                   <div className="select">
                                       <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                                           <option value="">Select Gender</option>
                                           <option value="Female">Female</option>
                                           <option value="Male">Male</option>
                                           <option value="Non-binary">Non-binary</option>
                                           <option value="None provided">None provided</option>
                                       </select>
                                   </div>
                               </div>
                           </div>


                           {/* Discharge Type filter */}
                           <div className="field">
                               <input
                                   type="checkbox"
                                   name="dischargeType"
                                   className="checkbox"
                                   checked={activeFilters.dischargeType}
                                   onChange={handleFilterToggle}
                               />
                               <label className="ml-2">Discharge Type</label>
                               <div className="control">
                                   <div className="select">
                                       <select name="dischargeType" value={filters.dischargeType} onChange={handleFilterChange}>
                                           <option value="">Select Discharge Type</option>
                                           <option value="Full Recovery">Full Recovery</option>
                                           <option value="Partial Recovery">Partial Recovery</option>
                                           <option value="Transferred">Transferred</option>
                                           <option value="Discharged Against Medical Advice">Discharged Against Medical Advice</option>
                                       </select>
                                   </div>
                               </div>
                           </div>


                           {/* Race filter */}
                           <div className="field">
                               <input
                                   type="checkbox"
                                   name="race"
                                   className="checkbox"
                                   checked={activeFilters.race}
                                   onChange={handleFilterToggle}
                               />
                               <label className="ml-2">Race</label>
                               <div className="control">
                                   <div className="select">
                                       <select name="race" value={filters.race} onChange={handleFilterChange}>
                                           <option value="">Select Race</option>
                                           <option value="Caucasian">Caucasian</option>
                                           <option value="African American">African American</option>
                                           <option value="Asian">Asian</option>
                                           <option value="Hispanic">Hispanic</option>
                                       </select>
                                   </div>
                               </div>
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
                               <table className="table is-narrow is-striped">
                                   <thead>
                                       <tr>
                                           <th>ID</th>
                                           {activeFilters.gender && <th>Gender</th>}
                                           {activeFilters.dischargeType && <th>Discharge Type</th>}
                                           {activeFilters.race && <th>Race</th>}
                                           <th>Name</th>
                                           <th>DOB</th>
                                           <th>Intake Date</th>
                                           <th>Discharge Date</th>
                                           <th>Notes</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                       {filteredData.map(item => (
                                           <tr key={item.patientId}>
                                               <td>{item.patientId}</td>
                                               {activeFilters.gender && <td>{item.gender}</td>}
                                               {activeFilters.dischargeType && <td>{item.dischargeType}</td>}
                                               {activeFilters.race && <td>{item.race}</td>}
                                               <td>{item.name}</td>
                                               <td>{new Date(item.dob).toLocaleDateString()}</td>
                                               <td>{new Date(item.intakeDate).toLocaleString()}</td>
                                               <td>{new Date(item.dischargeDate).toLocaleString()}</td>
                                               <td>{item.clinicianNotes}</td>
                                           </tr>
                                       ))}
                                   </tbody>
                               </table>
                           </div>
                       )}
                       {/* Navigation buttons */}
                       <div className="buttons has-text-centered mt-3">
                           <button className="button is-link" onClick={handleDataVisualClick}>Go To Data Visualizations</button>
                           <button className="button is-info" onClick={handleAnalyticClick}>Go To Analytics</button>
                           <button className="button is-link" onClick={handleExport}><FaDownload style={{ marginRight: '8px' }} /> Export Selected Data</button>
                           <button className="button is-info" onClick={handleReportClick}>Generate Report</button>
                       </div>
                   </div>
               </div>
           </div>
       </>
   );
}


export default Home;