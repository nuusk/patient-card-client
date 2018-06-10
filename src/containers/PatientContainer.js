import React, { Component } from 'react';
import PatientList from '../components/PatientList/PatientList';

export default class PatientContainer extends Component {
  constructor() {
    super();
    this.serverURL = 'http://localhost:5000';
    this.state = {
      patientList: []
    };
  }

  componentWillMount() {
    fetch(`${this.serverURL}/observations/height/44054`)
    .then(blob => blob.json())
    .then(patientList => {
      this.setState({
        patientList: patientList
      });
    });
  }

  render() {
    return (
      <div>
        <PatientList
          patientList={this.state.patientList}
        />
      </div>
    )
  }
};
