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
      pointHitRadius: 10
    }
  ]
};


export default class PatientResourcesDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectionRange: {
        startDate: new Date(1950, 1),
        endDate: new Date(2040, 1),
        key: 'selection',
      },
      isCalendarVisible: false,
      isResourcesTerminalVisible: false,
      selectedObservation: 'BodyHeight'
    }

    this.handleRangeChange = this.handleRangeChange.bind(this);
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


  render () {
    let yData = [];
    let xData = [];
    switch(this.state.selectedObservation) {
      case 'BodyHeight':
        data.datasets[0].label = 'Height [m]';
        this.props.observationBodyHeightResource.forEach((bodyHeightResource, index) => {
          if (new Date(bodyHeightResource.values[0].issued) > this.state.selectionRange.startDate && new Date(bodyHeightResource.values[0].issued) < this.state.selectionRange.endDate) {
            yData.push(bodyHeightResource.values[0].value);
            xData.push(new Date(bodyHeightResource.values[0].issued).toLocaleDateString());
          }
        });
        break;
      case 'BodyWeight':
        data.datasets[0].label = 'Weight [kg]';
        this.props.observationBodyWeightResource.forEach((bodyWeightResource, index) => {
          if (new Date(bodyWeightResource.values[0].issued) > this.state.selectionRange.startDate && new Date(bodyWeightResource.values[0].issued) < this.state.selectionRange.endDate) {
            yData.push(bodyWeightResource.values[0].value);
            xData.push(new Date(bodyWeightResource.values[0].issued).toLocaleDateString());
          }
        });
        break;
      case 'BMI':
        data.datasets[0].label = 'BMI [kg/m^2]';
        this.props.observationBMIResource.forEach((BMIResource, index) => {
          if (new Date(BMIResource.values[0].issued) > this.state.selectionRange.startDate && new Date(BMIResource.values[0].issued) < this.state.selectionRange.endDate) {
            yData.push(BMIResource.values[0].value);
            xData.push(new Date(BMIResource.values[0].issued).toLocaleDateString());
          }
        });
        break;
      case 'HBA1C':
        data.datasets[0].label = 'HBA1C [%]';
        this.props.observationHBA1CResource.forEach((HBA1CResource, index) => {
          if (new Date(HBA1CResource.values[0].issued) > this.state.selectionRange.startDate && new Date(HBA1CResource.values[0].issued) < this.state.selectionRange.endDate) {
            yData.push(HBA1CResource.values[0].value);
            xData.push(new Date(HBA1CResource.values[0].issued).toLocaleDateString());
          }
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
                className={`frame-button ${this.state.isCalendarVisible ? 'is-on' : 'is-off'}`}
                onClick={()=>{this.setState({isCalendarVisible: !this.state.isCalendarVisible, isResourcesTerminalVisible: false})}}
              >
                { this.state.isCalendarVisible ? "OK" : "Select Date" }
              </div>
              <div className="date-range-info">
                from {new Date(this.state.selectionRange.startDate).toLocaleDateString()} <br/>
                to {new Date(this.state.selectionRange.endDate).toLocaleDateString()}
              </div>
              <div 
                className={`frame-button ${this.state.isResourcesTerminalVisible ? 'is-on' : 'is-off'}`}
                onClick={()=>{this.setState({isResourcesTerminalVisible: !this.state.isResourcesTerminalVisible, isCalendarVisible: false})}}
              >
                { this.state.isResourcesTerminalVisible ? "OK" : "Modify resource" }
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
              <div onClick={()=>{this.setState({selectedObservation:'BodyHeight'})}} className={`switch-chart switch-chart-height ${this.state.selectedObservation==='BodyHeight' ? 'selected' : ''}`} />
              <div className={`switch-chart-button-description `}>Height</div>
            </div>
            <div>
              <div onClick={()=>{this.setState({selectedObservation:'BodyWeight'})}} className={`switch-chart switch-chart-weight ${this.state.selectedObservation==='BodyWeight' ? 'selected' : ''}`} />
              <div className={`switch-chart-button-description `}>Weight</div>
            </div>
            <div>
              <div onClick={()=>{this.setState({selectedObservation:'BMI'})}} className={`switch-chart switch-chart-bmi ${this.state.selectedObservation==='BMI' ? 'selected' : ''}`} />
              <div className={`switch-chart-button-description `}>BMI</div>
            </div>
            <div>
              <div onClick={()=>{this.setState({selectedObservation:'HBA1C'})}} className={`switch-chart switch-chart-hba1c ${this.state.selectedObservation==='HBA1C' ? 'selected' : ''}`} />
              <div className={`switch-chart-button-description `}>HBA1C</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
 
