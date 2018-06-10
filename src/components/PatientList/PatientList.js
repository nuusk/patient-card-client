import React from 'react';
import PatientItem from '../PatientItem/PatientItem';
import './PatientList.css';

const PatientList = (props) => {
  return (
    <div className="PatientList">
      {
        props.patientList.map((patient, index) => (
          <PatientItem
            key={patient._id}
            observation={patient.observation}
            value={patient.value}
            unit={patient.unit}
          />
        ))
      }
    </div>
  );
};

export default PatientList;