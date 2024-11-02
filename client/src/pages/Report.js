import {React, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function Report() {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/home");
  };

  const [month, setMonth] = useState('')
  
  //Get filtered patient data passed from home screen
  const patientData = useLocation();
  const data = patientData.state;

  const generatePDF = () => {
    const doc = new jsPDF();

    const monthData = data.filter(item => {
      console.log(item.dischargeType)
      return(item.intakeDate.substring(0, 7) === month)
    })

    doc.text(`Date (MM/YYYY): ${month.substring(5)}/${month.substring(0, 4)}\n`, 10, 10);

    doc.text("Crisis Intake and Discharge Report", 100, 10);

    autoTable(doc, {
      head: [['', '']],
      body: [
        ['Number of clients year-to-date (total)', `${data.length}`],
      ],
    });

    autoTable(doc, {
      head: [['', '']],
      body: [
        ['Number of intakes (total)', `${monthData.length}`],
        ['Number of intakes that were a readmission within 72 hours', 'Insufficient Data'],
        ['Number of intakes that were a readmission within 30 days', 'Insufficient Data']
      ],
    });

    autoTable(doc, {
      head: [['', '']],
      body: [
        ['Number of discharges to hospital', `${monthData.length}`],
        ['Number of discharges to higher level of crisis care (other than hospital)', `${monthData.filter(item => {return(item.dischargeType === 'Discharged to hospital')}).length}`],
        ['Number of discharges to home/community', `${monthData.filter(item => {return(item.dischargeType === "Discharged to home/community")}).length}`],
        ['Number of discharges under undesirable circumstances', `${monthData.filter(item => {return(item.dischargeType === "Discharged under undesirable circumstances")}).length}`],
        ['Number of clients with unknown discharge disposition', `${monthData.filter(item => {return(item.dischargeType === "Discharged to higher level of crisis care")}).length}`]
      ],
    });

    autoTable(doc, {
      head: [['', '']],
      body: [
        ['Average length of stay (in hours)', ''],
      ],
    });

    autoTable(doc, {
      head: [['Client Gender', 'Discharged to Hospital', 'Country']],
      body: [
        ['Female or Woman', {}, 'Sweden'],
        ['Male or Man', 'castille@example.com', 'Spain'],
        ['Nonbinary', 'castille@example.com', 'Spain'],
        ['Gender unknown', 'castille@example.com', 'Spain'],
        // ...
      ],
    });
    doc.save("blank.pdf");
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      
      <h1 className="title has-text-centered has-text">Generate Report</h1>
      <button className="button" onClick={returnHome}>Back</button>
      <input class="input" type="text" placeholder="YYYY-MM" value={month} onChange={(e) => setMonth(e.target.value)}></input>
      <button className="button has-background-info has-text-black" onClick={generatePDF}>Submit</button>
      <button className="button is-info" onClick={generatePDF} style={{ marginLeft: '1rem' }}>
        Export PDF
      </button>
    </div>
  );
}

export default Report;
