import React from 'react';
import './PatientResourcesDetails.css';

const PatientResourcesDetails = (props) => {
  return (
    <div className="PatientResourcesDetails">
      <section className="resources-frame">
        <div>{props.patientResource.firstName} {props.patientResource.lastName}</div>
      </section>
    </div>
  );
};

export default PatientResourcesDetails;