import React, { Component } from 'react';
import PatientList from '../components/PatientList/PatientList';
import PatientResourcesDetails from '../components/PatientResourcesDetails/PatientResourcesDetails';
import PatientResourcesMenu from '../components/PatientResourcesMenu/PatientResourcesMenu';
import PatientSearchBar from '../components/PatientSearchBar/PatientSearchBar';

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
    this.modifyResource = this.modifyResource.bind(this);
    this.searchForPatient = this.searchForPatient.bind(this);
    this.update = this.update.bind(this);
  }

  // componentDidMount() {
  //   this.selectPatient(44001);
  // }

  update(patientID) {
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
    'observationBodyWeightResource': {},
    'observationBMIResource': {},
    'observationHBA1CResource': {},
    'medicationResource': {},
    'conditionResource': {}
  };

  Promise.all([
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
    combinedResources['observationBodyWeightResource'] = data[3];
    combinedResources['observationBMIResource'] = data[4];
    combinedResources['observationHBA1CResource'] = data[5];
    combinedResources['medicationResource'] = data[6];
    combinedResources['conditionResource'] = data[7];
    // console.log('info z konterera:');
    console.log(combinedResources);
    console.log(data[0])
    this.setState({
      selectedPatientID: patientID,
      selectedPatientResources: combinedResources
    }, () => {
      this.changeContent('resourcesMenu', this.containerContentTimer);
    });
  });
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
      'observationBodyWeightResource': {},
      'observationBMIResource': {},
      'observationHBA1CResource': {},
      'medicationResource': {},
      'conditionResource': {}
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
      combinedResources['observationBodyWeightResource'] = data[3];
      combinedResources['observationBMIResource'] = data[4];
      combinedResources['observationHBA1CResource'] = data[5];
      combinedResources['medicationResource'] = data[6];
      combinedResources['conditionResource'] = data[7];
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

  searchForPatient(e) {
    const query = e.target.value;
    if (!query) {
      fetch(`${this.serverURL}/patients`)
      .then(blob => blob.json())
      .then(patientList => {
        this.setState({
          patientList: patientList
        });
      });
    };
    if (this.searchForPatientTimer) clearInterval(this.searchForPatientTimer);
    this.searchForPatientTimer = setTimeout(()=>{
      if (isNaN(query)) {
        fetch(`${this.serverURL}/patients/name/${query}`)
        .then(blob => blob.json())
        .catch(err => { console.log(err) })
        .then(patientList => {
          if (patientList.length) {
            this.setState({
              patientList: patientList
            });
          }
        });
      } else {
        fetch(`${this.serverURL}/patient/${query}`)
        .then(blob => blob.json())
        .catch(err => { console.log(err) })
        .then(patient => {
          if (patient) {
            this.setState({
              patientList: new Array(patient)
            });
          }
        });
      }
    }, 800);
  }

  modifyResource(resourceType, resourceID, newValue, observationIndex) {

    // console.log(resourceType);
    // console.log(resourceID);
    // console.log(newValue);
    // console.log(observationIndex);
    fetch(`http://localhost:5000/observation/${resourceType.toLowerCase()}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ id: resourceID, newValue: newValue })
    }).then(blob => blob.json())
      .then(data => {
        // console.log(data);
        // console.log(this.state.selectedPatientResources);
        // let newResourceArray = this.state.selectedPatientResources.observationBMIResource.slice();
        // newResourceArray[observationIndex] = data;
        // this.setState({
        //   selectedPatientResources: {
        //     observationBMIResource: newResourceArray
        //   }
        // });
        // this.update(this.state.selectedPatientID);
        // console.log(data);
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
    let content;
    switch(this.state.containerContent) {
      case 'resourcesMenu':
        content = (
          <PatientResourcesMenu
            patientResource={this.state.selectedPatientResources['patientResource']}
            observationBodyHeightResource={this.state.selectedPatientResources['observationBodyHeightResource']}
            observationBodyWeightResource={this.state.selectedPatientResources['observationBodyWeightResource']}
            observationBMIResource={this.state.selectedPatientResources['observationBMIResource']}
            observationHBA1CResource={this.state.selectedPatientResources['observationHBA1CResource']}
            medicationResource={this.state.selectedPatientResources['medicationResource']}
            conditionResource={this.state.selectedPatientResources['conditionResource']}
            handleClick={this.changeContent}
          />);
        break;
      case 'resourcesDetails':
        content = (
          <PatientResourcesDetails
            patientResource={this.state.selectedPatientResources['patientResource']}
            observationBodyHeightResource={this.state.selectedPatientResources['observationBodyHeightResource']}
            observationBodyWeightResource={this.state.selectedPatientResources['observationBodyWeightResource']}
            observationBMIResource={this.state.selectedPatientResources['observationBMIResource']}
            observationHBA1CResource={this.state.selectedPatientResources['observationHBA1CResource']}
            medicationResource={this.state.selectedPatientResources['medicationResource']}
            conditionResource={this.state.selectedPatientResources['conditionResource']}
            handleClick={this.changeContent}
            modifyResource={this.modifyResource}
          />);
        break;
      case 'patientList':
        content = (
          <span>
            <PatientSearchBar
              handleChange={this.searchForPatient}
              isVisible={!this.state.flipBoard}
            />
            <PatientList
              patientList={this.state.patientList}
              handleClick={this.selectPatient}
              shortFrame={this.shortFrame}
              flipBoard={this.state.flipBoard}
            />
          </span>);
        break;
      default:
        content = (
          <span>Something is missing... :(</span>
        );
        break;
    }
    return content;
  }
};
