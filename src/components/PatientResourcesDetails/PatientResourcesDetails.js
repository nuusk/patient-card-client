import React from 'react';
import { Component } from 'react';
import './PatientResourcesDetails.css';

import {Line} from 'react-chartjs-2';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

const colors = {
  balloonRed: 'rgba(237,85,114,1)',
  balloonBlue: '#47bbed',
  balloonGreen: '#5fce71',
  balloonOrange: '#e79f4c'
}

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Body Height Observations',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(119,221,255,1)',
      borderColor: 'rgba(119,221,255,1)',
      pointBorderColor: colors.balloonBlue,
      pointBackgroundColor: '#fefefe',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: colors.balloonBlue,
      pointHoverBorderColor: colors.balloonBlue,
      pointRadius: 5,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};


export default class PatientResourcesDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectionRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
      isCalendarVisible: false,
      selectedObservation: 'BodyHeight'
    }

    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
  }

  handleRangeChange(which) {
    console.log(which);
    if (which.selection) {
      this.setState({
        selectionRange: {
          startDate: which.selection.startDate,
          endDate: which.selection.endDate
        },
      });
    } else {
      this.setState({
        selectionRange: {
          startDate: which.range1.startDate,
          endDate: which.range1.endDate
        },
      });
    }
  }

  toggleCalendar() {
    console.log(this.state.isCalendarVisible);
    this.setState({
      isCalendarVisible: !this.state.isCalendarVisible
    });
  }
  
  render () {
    let yData = [];
    let xData = [];
    switch(this.state.selectedObservation) {
      case 'BodyHeight':
        this.props.observationBodyHeightResource.forEach((bodyHeightResource, index) => {
          yData.push(bodyHeightResource.values[0].value);
          xData.push(bodyHeightResource.values[0].issued);
        });
        break;
      case 'BodyWeight':
        this.props.observationBodyWeightResource.forEach((bodyWeightResource, index) => {
          yData.push(bodyWeightResource.values[0].value);
          xData.push(bodyWeightResource.values[0].issued);
        });
        break;
      case 'BMI':
        this.props.observationBMIResource.forEach((BMIResource, index) => {
          yData.push(BMIResource.values[0].value);
          xData.push(BMIResource.values[0].issued);
        });
        break;
      case 'HBA1C':
        this.props.observationHBA1CResource.forEach((HBA1CResource, index) => {
          yData.push(HBA1CResource.values[0].value);
          xData.push(HBA1CResource.values[0].issued);
        });
        break;
    }
    
    data.datasets[0].data = yData;
    data.labels = xData;

    return (
      <div className="PatientResourcesDetails">
        <section className="resources-frame">
          <div className="frame-menu">
            <div className="frame-menu__left-column">
              <div className="patient-additional">{this.props.patientResource.prefix} </div>
              <div className="patient-name">{this.props.patientResource.firstName} {this.props.patientResource.lastName}</div>
              <div className="patient-additional">{this.props.patientResource.city}, {this.props.patientResource.state} {this.props.patientResource.country}</div>
            </div>
            <div className="frame-menu__right-column">
            { this.state.isCalendarVisible ? 
              <DateRangePicker
                ranges={[this.state.selectionRange]}
                onChange={this.handleRangeChange}
              /> : 
              null
            }

              <div 
                className={`select-date ${this.state.isCalendarVisible ? 'is-on' : 'is-off'}`}
                onClick={this.toggleCalendar}
              >
                { this.state.isCalendarVisible ? "OK" : "Select Date" }
              </div>
            </div>
          </div>
          <div className={`chart-wrapper ${this.state.isCalendarVisible ? 'dark' : ''}`}>
            <Line
              data={data}
              height={100}
            />
          </div>
        </section>
        <div className="switch-chart-menu">
          <div className="switch-chart-text">Switch chart</div>
          <div className="switch-chart-buttons">
            <div>
              <div onClick={()=>{this.setState({selectedObservation:'BodyHeight'})}} className="switch-chart switch-chart-height" />
              <div className="switch-chart-button-description">Height</div>
            </div>
            <div>
              <div onClick={()=>{this.setState({selectedObservation:'BodyWeight'})}} className="switch-chart switch-chart-weight" />
              <div className="switch-chart-button-description">Weight</div>
            </div>
            <div>
              <div onClick={()=>{this.setState({selectedObservation:'BMI'})}} className="switch-chart switch-chart-bmi" />
              <div className="switch-chart-button-description">BMI</div>
            </div>
            <div>
              <div onClick={()=>{this.setState({selectedObservation:'HBA1C'})}} className="switch-chart switch-chart-hba1c" />
              <div className="switch-chart-button-description">HBA1C</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
 
