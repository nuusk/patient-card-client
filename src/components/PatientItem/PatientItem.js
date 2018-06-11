import React from 'react';
import './PatientItem.css';

const PatientItem = (props) => {
  return (
    <div
      className={`PatientItem balloon-red ${props.flipBoard ? 'animate-flip' : ''}`}
      onClick={(e) => {
        e.target.classList.toggle('animate-flip-instant');
        props.handleClick(props.patient.patientID);
        // console.log(e.target);
        // setTimeout(()=>{
        //   props.handleClick(props.patient.patientID)
        // }, props.shortFrame);
      }}
    >
      <div className="patient-name">{props.patient.firstName} {props.patient.lastName}</div>
      <div className="patient-address">{props.patient.city} {props.patient.state}, {props.patient.country}</div>
      <div className="patient-description">
        {new Date().getFullYear() - new Date(props.patient.birthDate).getFullYear()} yrs.
      </div>
    </div>
    );
};

export default PatientItem;

// <div>{props.patient.values[0].value.toFixed(4)} {props.patient.unit}</div>
//       <div>{props.patient.effectiveDateTime} <br/ > {props.patient.values[0].issued}</div>