import React from 'react';
import './PatientSearchBar.css';

const PatientSearchBar = (props) => {
  return (
    <div className="PatientSearchBar">
      <input
        className={`${props.isVisible ? 'isVisible':''}`}
        onChange={props.handleChange}
        type="text"
        placeholder="Search for patient" 
      />
    </div>
  );
};

export default PatientSearchBar;