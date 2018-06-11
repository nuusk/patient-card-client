import React from 'react';
import './PatientResourcesDetails.css';

const PatientResourcesDetails = (props) => {
  return (
    <div className="PatientResourcesDetails">
      <section className="resources-frame">
        <div>{props.patientResource.prefix} {props.patientResource.firstName} {props.patientResource.lastName}</div>
        <div>{props.patientResource.city}, {props.patientResource.state} {props.patientResource.country}</div>
      </section>
    </div>
  );
};

export default PatientResourcesDetails;