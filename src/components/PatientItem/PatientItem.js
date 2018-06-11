import React from 'react';
import './PatientItem.css';

const PatientItem = (props) => {
  return (
    <div
      className="PatientItem balloon-red"
      onClick={(e) => {
        e.target.classList.toggle('animate-flip');
        console.log(e.target);
        setTimeout(()=>{
          props.handleClick(props.patient.patientID)
        }, props.shortFrame);
      }}
    >
      <div>{props.patient.firstName} {props.patient.lastName}</div>
      
    </div>
    );
};

export default PatientItem;

// <div>{props.patient.values[0].value.toFixed(4)} {props.patient.unit}</div>
//       <div>{props.patient.effectiveDateTime} <br/ > {props.patient.values[0].issued}</div>