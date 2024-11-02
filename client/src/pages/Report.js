import React from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

function Report() {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/home");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("This is a blank PDF document.", 10, 10);
    doc.save("blank.pdf");
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 className="title has-text-centered has-text">Report</h1>
      <button className="button" onClick={returnHome}>Back</button>
      <button className="button is-info" onClick={generatePDF} style={{ marginLeft: '1rem' }}>
        Export PDF
      </button>
    </div>
  );
}

export default Report;
