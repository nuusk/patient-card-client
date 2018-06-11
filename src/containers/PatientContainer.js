import React, { Component } from 'react';
import PatientList from '../components/PatientList/PatientList';
import PatientResourcesDetails from '../components/PatientResourcesDetails/PatientResourcesDetails';

export default class PatientContainer extends Component {
  constructor() {
    super();
    this.serverURL = 'http://localhost:5000';
    this.shortFrame = 2000;
    this.longFrame = 100;
    this.state = {
      patientList: [],
      selectedPatientID: null,
      selectedPatientResources: {},
      flipBoard: false
    };

    this.selectPatient = this.selectPatient.bind(this);
  }

  selectPatient(patientID) {
    const flipCardsPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("yo")
      }, this.longFrame);
    });
    

    const patientResourceRequest = fetch(`${this.serverURL}/patient/${patientID}`)
      .then(blob => blob.json());

    const observationBodyHeightResourceRequest = fetch(`${this.serverURL}/observations/height/${patientID}`)
      .then(blob => blob.json());

    const combinedResources = {
      'patientResource': {},
      'observationBodyHeightResource': {}
    };

    Promise.all([
      flipCardsPromise,
      patientResourceRequest,
      observationBodyHeightResourceRequest
    ]).then(data => {
      combinedResources['patientResource'] = data[1];
      combinedResources['observationBodyHeightResource'] = data[2];
      this.setState({
        selectedPatientID: patientID,
        // selectedPatientResources: combinedResources
        flipBoard: true
      }, () => {
        console.log(this.state);
      });
    });
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
          this.state.selectedPatientIsD ?
          <PatientResourcesDetails
            patientResource={this.state.selectedPatientResources['patientResource']}
          /> :
          <PatientList
            patientList={this.state.patientList}
            handleClick={this.selectPatient}
            shortFrame={this.shortFrame}
            flipBoard={this.state.flipBoard}
            selectedPatientID={this.state.selectedPatientID}
          />
    )
  }
};
