const { jsPDF } = require("jspdf");
const fs = require('fs');

const dataGrid = {
    "columnTypes": {
      "patientId": "number",
      "name": "string",
      "dob": "date",
      "intakeDate": "date",
      "dischargeDate": "date",
      "dischargeType": [
        "Full Recovery",
        "Partial Recovery",
        "Transferred",
        "Discharged Against Medical Advice"
      ],
      "gender": [
        "Male",
        "Female",
        "Non-binary",
        "None provided"
      ],
      "sexualOrientation": [
        "Heterosexual",
        "Bisexual",
        "Asexual",
        "Lesbian"
      ],
      "race": [
        "Caucasian",
        "African American",
        "Asian",
        "Hispanic"
      ],
      "clinicianNotes": "string"
    },
    "tables": {
      "patients": [
        {
          "patientId": 100001,
          "name": "John Doe",
          "dob": "1985-06-15T00:00:00",
          "intakeDate": "2023-05-20T14:30:00",
          "dischargeDate": "2023-06-15T09:00:00",
          "dischargeType": "Full Recovery",
          "gender": "Male",
          "sexualOrientation": "Heterosexual",
          "race": "Caucasian",
          "clinicianNotes": "Patient responded well to treatment. Recommend follow-up in 3 months."
        },
        {
          "patientId": 100002,
          "name": "Jane Smith",
          "dob": "1992-11-03T00:00:00",
          "intakeDate": "2023-04-10T10:15:00",
          "dischargeDate": "2023-05-05T11:00:00",
          "dischargeType": "Partial Recovery",
          "gender": "Female",
          "sexualOrientation": "Bisexual",
          "race": "African American",
          "clinicianNotes": "Patient showed improvement but needs additional physical therapy."
        },
        {
          "patientId": 100003,
          "name": "Alex Brown",
          "dob": "1978-02-25T00:00:00",
          "intakeDate": "2023-03-01T13:45:00",
          "dischargeDate": "2023-04-01T15:30:00",
          "dischargeType": "Transferred",
          "gender": "Non-binary",
          "sexualOrientation": "Asexual",
          "race": "Asian",
          "clinicianNotes": "Patient transferred to specialized care facility for further assessment."
        },
        {
          "patientId": 100004,
          "name": "Maria Garcia",
          "dob": "2001-07-18T00:00:00",
          "intakeDate": "2023-02-15T09:30:00",
          "dischargeDate": "2023-03-10T10:00:00",
          "dischargeType": "Discharged Against Medical Advice",
          "gender": "Female",
          "sexualOrientation": "Heterosexual",
          "race": "Hispanic",
          "clinicianNotes": "Patient discharged against medical advice after improvement."
        },
        {
          "patientId": 100005,
          "name": "Samuel Lee",
          "dob": "1969-04-22T00:00:00",
          "intakeDate": "2023-06-01T08:00:00",
          "dischargeDate": "2023-07-01T14:00:00",
          "dischargeType": "Full Recovery",
          "gender": "Male",
          "sexualOrientation": "Heterosexual",
          "race": "Asian",
          "clinicianNotes": "Patient recovered well and shows no residual symptoms."
        },
        {
          "patientId": 100006,
          "name": "Emma Thompson",
          "dob": "1988-12-30T00:00:00",
          "intakeDate": "2023-05-15T09:00:00",
          "dischargeDate": "2023-06-10T12:30:00",
          "dischargeType": "Partial Recovery",
          "gender": "Female",
          "sexualOrientation": "Lesbian",
          "race": "Caucasian",
          "clinicianNotes": "Patient needs continued outpatient therapy for sustained improvement."
        },
        {
          "patientId": 100007,
          "name": "Carlos Martinez",
          "dob": "1974-03-10T00:00:00",
          "intakeDate": "2023-07-20T11:15:00",
          "dischargeDate": "2023-08-15T10:45:00",
          "dischargeType": "Full Recovery",
          "gender": "Male",
          "sexualOrientation": "Heterosexual",
          "race": "Hispanic",
          "clinicianNotes": "Patient has fully recovered and was discharged with no complications."
        },
        {
          "patientId": 100008,
          "name": "Sophia Kim",
          "dob": "1995-09-05T00:00:00",
          "intakeDate": "2023-03-10T08:30:00",
          "dischargeDate": "2023-04-05T13:00:00",
          "dischargeType": "Transferred",
          "gender": "Female",
          "sexualOrientation": "Heterosexual",
          "race": "Asian",
          "clinicianNotes": "Patient transferred to a specialized unit for continued care."
        }
      ]
    }
  }
  
  
const doc = new jsPDF();

const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();
const margin = 15;

const today = new Date();
const date = today.toISOString(); 

doc.setFontSize(19);
doc.text("Patient Intake Report", 
         pageWidth / 2, margin, {align: "center", font:"helvetica"});
doc.setFontSize(8);

const imgPath = './image.png';
const imgData = fs.readFileSync(imgPath).toString('base64');

const imgY = 25;  
const imgWidth = 125;  
const imgHeight = 15; 
const xCenter = (pageWidth - imgWidth) / 2;

doc.addImage(`data:image/png;base64,${imgData}`, "PNG", xCenter + 3, imgY, imgWidth, imgHeight);

let y = 60;
const columns = Object.keys(dataGrid.columnTypes);
const columnCount = columns.length;
const columnWidth = (pageWidth - 2 * margin) / columnCount;


dataGrid.tables.patients.forEach(patient => {
    columns.forEach((column, index) => {
      let value = patient[column];
  
      if (dataGrid.columnTypes[column] === "date") {
        value = new Date(value).toLocaleDateString();
      }
  
      const textLines = doc.splitTextToSize(value.toString(), columnWidth);
      const textHeight = textLines.length * (12 * 1.2); 
      textLines.forEach((line, lineIndex) => {
        doc.text(line, margin + index * columnWidth, y + lineIndex * (12 * 1.2));
      });
  
      
      doc.rect(margin + index * columnWidth, y, columnWidth, textHeight);
    });
    y += 10;
  });
  
  doc.rect(margin, 50, pageWidth - 2 * margin, y - 10 + 12); 

//_${date}
doc.save(`Crisis_Intake_Discharge_Report.pdf`);
