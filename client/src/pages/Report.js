import React from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import testData from './testData2.json'; 
import autoTable from 'jspdf-autotable';

function calculateDischargeSummary(patients) {
  const currentYear = new Date().getFullYear();
  const ageGroups = {
    "0-4": { hospital: 0, home: 0, undesirable: 0, higher: 0 },
    "5-9": { hospital: 0, home: 0, undesirable: 0, higher: 0 },
    "10-13": { hospital: 0, home: 0, undesirable: 0, higher: 0 },
    "14-17": { hospital: 0, home: 0, undesirable: 0, higher: 0 },
    "18-24": { hospital: 0, home: 0, undesirable: 0, higher: 0 },
    "25-34": { hospital: 0, home: 0, undesirable: 0, higher: 0 },
    "35-44": { hospital: 0, home: 0, undesirable: 0, higher: 0 },
    "45-54": { hospital: 0, home: 0, undesirable: 0, higher: 0 },
    "55-64": { hospital: 0, home: 0, undesirable: 0, higher: 0 },
    "65-74": { hospital: 0, home: 0, undesirable: 0, higher: 0 },
    "75-84": { hospital: 0, home: 0, undesirable: 0, higher: 0 },
    "85+": { hospital: 0, home: 0, undesirable: 0, higher: 0 },
    "unknown": { hospital: 0, home: 0, undesirable: 0, higher: 0 }
  };

  patients.forEach(patient => {
    const age = currentYear - new Date(patient.dob).getFullYear();
    let ageGroup;

    if (age <= 4) ageGroup = "0-4";
    else if (age <= 9) ageGroup = "5-9";
    else if (age <= 13) ageGroup = "10-13";
    else if (age <= 17) ageGroup = "14-17";
    else if (age <= 24) ageGroup = "18-24";
    else if (age <= 34) ageGroup = "25-34";
    else if (age <= 44) ageGroup = "35-44";
    else if (age <= 54) ageGroup = "45-54";
    else if (age <= 64) ageGroup = "55-64";
    else if (age <= 74) ageGroup = "65-74";
    else if (age <= 84) ageGroup = "75-84";
    else ageGroup = "85+";

    // Count discharges based on type
    switch (patient.dischargeType) {
      case "Discharged to hospital":
        ageGroups[ageGroup].hospital++;
        break;
      case "Discharged to home/community":
        ageGroups[ageGroup].home++;
        break;
      case "Discharged under undesirable circumstances":
        ageGroups[ageGroup].undesirable++;
        break;
      case "Discharged to higher level of crisis care":
        ageGroups[ageGroup].higher++;
        break;
      default:
        break;
    }
  });

  return ageGroups;
}

function Report() {
  const navigate = useNavigate();
  
  // Calculate the discharge summary from imported data
  const dischargeSummary = calculateDischargeSummary(testData.tables.patients);

  const returnHome = () => {
    navigate("/home");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Patient Discharge Summary", 10, 10);
  
    const ageGroupKeys = Object.keys(dischargeSummary);
    const tableData = ageGroupKeys.map(group => {
      const summary = dischargeSummary[group];
      return [
        group,
        summary.hospital,
        summary.home,
        summary.undesirable,
        summary.higher
      ];
    });
  
    // Calculate grand totals
    let grandTotal = {
      hospital: 0,
      home: 0,
      undesirable: 0,
      higher: 0,
    };
  
    tableData.forEach(row => {
      grandTotal.hospital += row[1];
      grandTotal.home += row[2];
      grandTotal.undesirable += row[3];
      grandTotal.higher += row[4];
    });
  
    // Add subtotal row to the data
    const subtotalRow = ['Subtotal', grandTotal.hospital, grandTotal.home, grandTotal.undesirable, grandTotal.higher];
    tableData.push(subtotalRow);
  
    // Add Table Total as a single boxed row
    const totalRow = ['', '', '', '', '8'];
    tableData.push(totalRow);
  
    // Add autotable for the main discharge summary
    doc.autoTable({
      head: [['Age Group', 'Discharged to Hospital', 'Discharged to Home/Community', 'Discharged Under Undesirable Circumstances', 'Discharged to Higher Level of Crisis Care']],
      body: tableData,
      startY: 20, // Start Y position after the title
      margin: { horizontal: 10 },
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      didParseCell: (data) => {
        // Style the total row
        if (data.row.index === tableData.length - 1) { 
          data.cell.styles.fillColor = [220, 220, 220]; 
          data.cell.styles.fontStyle = 'bold'; 
          data.cell.styles.halign = 'center'; 
          data.cell.styles.cellPadding = 5; 
          data.cell.styles.fontSize = 14; 
        }
      },
    });
  
    doc.save("discharge_summary.pdf");
  };
  	
  
  

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 className="title has-text-centered">Report</h1>
      <button className="button" onClick={returnHome}>Back</button>
      <button className="button is-info" onClick={generatePDF} style={{ marginLeft: '1rem' }}>
        Export PDF
      </button>
    </div>
  );
}

export default Report;


