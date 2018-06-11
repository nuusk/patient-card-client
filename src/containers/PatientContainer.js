import React, { Component } from 'react';
import PatientList from '../components/PatientList/PatientList';
import PatientResourcesDetails from '../components/PatientResourcesDetails/PatientResourcesDetails';

export default class PatientContainer extends Component {
  constructor() {
    super();
    this.serverURL = 'http://localhost:5000';
    this.shortFrame = 2000;
    this.state = {
      patientList: [],
      selectedPatientID: null,
      selectedPatientResources: {}
    };

    this.selectPatient = this.selectPatient.bind(this);
  }

  selectPatient(patientID) {
    // const patientResourceRequest = fetch(`${this.serverURL}/patient/${patientID}`)
    //   .then(blob => blob.json());

    // const observationBodyHeightResourceRequest = fetch(`${this.serverURL}/observations/height/${patientID}`)
    //   .then(blob => blob.json());

    // const combinedResources = {
    //   'patientResource': {},
    //   'observationBodyHeightResource': {}
    // };

    // Promise.all([
    //   patientResourceRequest,
    //   observationBodyHeightResourceRequest
    // ]).then(data => {
    //   combinedResources['patientResource'] = data[0];
    //   combinedResources['observationBodyHeightResource'] = data[1];
      console.log('info z konterera:');
    //   console.log(combinedResources);
      // this.setState({
      //   selectedPatientID: patientID,
      //   selectedPatientResources: combinedResources
      // });
    // });
  }

  componentWillMount() {
    fetch(`${this.serverURL}/patients`)
    .then(blob => blob.json())
    .then(patientList => {
      this.setState({
        patientList: patientList
      });
    });
  }

  render() {
    return (
          this.state.selectedPatientID ?
          <PatientResourcesDetails
            patientResource={this.state.selectedPatientResources['patientResource']}
          /> :
          <PatientList
            patientList={this.state.patientList}
            handleClick={this.selectPatient}
            shortFrame={this.shortFrame}
          />
    )
  }
};
