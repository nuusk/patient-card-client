import React from 'react';
import './PatientResourcesDetails.css';

import {Line} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Body Height Observations',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(119,221,255,1)',
      borderColor: 'rgba(119,221,255,1)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fefefe',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(119,221,255,1)',
      pointHoverBorderColor: 'rgba(119,221,255,1)',
      pointRadius: 5,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const alertHello = () => {
  alert('hello');
}

const options = {
  legend: {
    onClick: alertHello
  }
}
 
const PatientResourcesDetails = (props) => {
  let bodyHeightChart = [];
  let bodyHeightDates = [];
  props.observationBodyHeightResource.forEach((bodyHeightResource, index) => {
    // console.log([index, bodyHeightResource.values[0].value])
    bodyHeightChart.push(bodyHeightResource.values[0].value);
    bodyHeightDates.push(bodyHeightResource.values[0].issued);
  });
  data.datasets[0].data = bodyHeightChart;
  data.labels = bodyHeightDates;
  return (
    <div className="PatientResourcesDetails">
      <section className="resources-frame">
        <div>{props.patientResource.prefix} {props.patientResource.firstName} {props.patientResource.lastName}</div>
        <div>{props.patientResource.city}, {props.patientResource.state} {props.patientResource.country}</div>
        {/*
          props.observationBodyHeightResource.map(bodyHeightResource => (
            <div>{bodyHeightResource.values[0].value}</div>
          ))
        */}
        <Line
          data={data}
          height={100}
          options={options}
        />
      </section>
    </div>
  );
};

export default PatientResourcesDetails;