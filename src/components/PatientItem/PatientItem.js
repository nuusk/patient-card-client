import React from 'react';
import './PatientItem.css';

const PatientItem = (props) => {
  console.log(props);
  return (
    <div className="PatientItem">
      <div>{props.observation}</div>
      <div>{Math.round(props.value*100)/100} {props.unit}</div>
    </div>
  );
};

export default PatientItem;