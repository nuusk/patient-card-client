import React, { Component } from 'react';
import PatientList from '../components/PatientList/PatientList';
import PatientResourcesDetails from '../components/PatientResourcesDetails/PatientResourcesDetails';
import PatientResourcesMenu from '../components/PatientResourcesMenu/PatientResourcesMenu';

export default class PatientContainer extends Component {
  constructor() {
    super();
    this.serverURL = 'http://localhost:5000';
    this.shortFrame = 200;
    this.longFrame = 600;
    this.containerContentTimer = 2000;
    this.state = {
      patientList: [],
      selectedPatientID: null,
      selectedPatientResources: {},
      flipBoard: false,
      containerContent: 'patientList'
    };

    this.selectPatient = this.selectPatient.bind(this);
    this.changeContent = this.changeContent.bind(this);
  }

  // componentDidMount() {
  //   this.selectPatient(44001);
  // }

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

    const observationBodyWeightResourceRequest = fetch(`${this.serverURL}/observations/weight/${patientID}`)
      .then(blob => blob.json());

    const observationBMIResourceRequest = fetch(`${this.serverURL}/observations/bmi/${patientID}`)
      .then(blob => blob.json());

    const observationHBA1CResourceRequest = fetch(`${this.serverURL}/observations/hba1c/${patientID}`)
      .then(blob => blob.json());

    const medicationResourceRequest = fetch(`${this.serverURL}/medications/${patientID}`)
      .then(blob => blob.json());
    
    const conditionResourceRequest = fetch(`${this.serverURL}/conditions/${patientID}`)
      .then(blob => blob.json());

    const combinedResources = {
      'patientResource': {},
      'observationBodyHeightResource': {},
      'observationBodyWeightResourceRequest': {},
      'observationBMIResourceRequest': {},
      'observationHBA1CResourceRequest': {},
      'medicationResourceRequest': {},
      'conditionResourceRequest': {}
    };

    Promise.all([
      flipCardsPromise,
      patientResourceRequest,
      observationBodyHeightResourceRequest,
      observationBodyWeightResourceRequest,
      observationBMIResourceRequest,
      observationHBA1CResourceRequest,
      medicationResourceRequest,
      conditionResourceRequest
    ]).then(data => {
      combinedResources['patientResource'] = data[1];
      combinedResources['observationBodyHeightResource'] = data[2];
      combinedResources['observationBodyWeightResourceRequest'] = data[3];
      combinedResources['observationBMIResourceRequest'] = data[4];
      combinedResources['observationHBA1CResourceRequest'] = data[5];
      combinedResources['medicationResourceRequest'] = data[6];
      combinedResources['conditionResourceRequest'] = data[7];
      console.log('info z konterera:');
      console.log(combinedResources);
      console.log(data[0])
      this.setState({
        selectedPatientID: patientID,
        selectedPatientResources: combinedResources,
        flipBoard: true
      }, () => {
        this.changeContent('resourcesMenu', this.containerContentTimer);
      });
    });
  }

  changeContent(content, delay) {
    setTimeout(() => {
      this.setState({
        containerContent: content
      });
    }, delay)
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
    let content;
    switch(this.state.containerContent) {
      case 'resourcesMenu':
        content = (
          <PatientResourcesMenu
            patientResource={this.state.selectedPatientResources['patientResource']}
            observationBodyHeightResource={this.state.selectedPatientResources['observationBodyHeightResource']}
            observationBodyWeightResource={this.state.selectedPatientResources['observationBodyWeightResourceRequest']}
            observationBMIResource={this.state.selectedPatientResources['observationBMIResourceRequest']}
            observationHBA1CResource={this.state.selectedPatientResources['observationHBA1CResourceRequest']}
            medicationResource={this.state.selectedPatientResources['medicationResourceRequest']}
            conditionResource={this.state.selectedPatientResources['conditionResourceRequest']}
          />);
        break;
      case 'resourcesDetails':
        content = (
          <PatientResourcesDetails
            patientResource={this.state.selectedPatientResources['patientResource']}
            observationBodyHeightResource={this.state.selectedPatientResources['observationBodyHeightResource']}
          />);
        break;
      case 'patientList':
        content = (
          <PatientList
            patientList={this.state.patientList}
            handleClick={this.selectPatient}
            shortFrame={this.shortFrame}
            flipBoard={this.state.flipBoard}
          />);
        break;
    }
    return content;
  }
};
