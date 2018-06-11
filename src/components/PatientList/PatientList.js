import React from 'react';
import PatientItem from '../PatientItem/PatientItem';
import './PatientList.css';

const PatientList = (props) => {
  return (
    <div className="PatientList">
      {
        props.patientList.slice(0,24).map((patient, index) => (
          <PatientItem
            key={patient._id}
            patient={patient}
            handleClick={props.handleClick}
            shortFrame={props.shortFrame}
            flipBoard={props.flipBoard}
          />
        ))
      }
    </div>
  );
};

export default PatientList;