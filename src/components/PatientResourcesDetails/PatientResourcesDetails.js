import React from 'react';
import { Component } from 'react';
import './PatientResourcesDetails.css';

import {Line} from 'react-chartjs-2';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';



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


export default class PatientResourcesDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectionRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
      isCalendarVisible: false
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
    let bodyHeightChart = [];
    let bodyHeightDates = [];
    this.props.observationBodyHeightResource.forEach((bodyHeightResource, index) => {
      // console.log([index, bodyHeightResource.values[0].value])
      bodyHeightChart.push(bodyHeightResource.values[0].value);
      bodyHeightDates.push(bodyHeightResource.values[0].issued);
    });
    data.datasets[0].data = bodyHeightChart;
    data.labels = bodyHeightDates;

    return (
      <div className="PatientResourcesDetails">
        <section className="resources-frame">
          <div className="frame-menu">
            <div className="frame-menu__left-column">
              <div>{this.props.patientResource.prefix} {this.props.patientResource.firstName} {this.props.patientResource.lastName}</div>
              <div>{this.props.patientResource.city}, {this.props.patientResource.state} {this.props.patientResource.country}</div>
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
          <Line
            data={data}
            height={100}
          />
        </section>
      </div>
    );
  }

}
 
