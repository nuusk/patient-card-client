import React from 'react';
import { Component } from 'react';
import './PatientResourcesMenu.css';

export default class PatientResourcesMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
    }
  }

  render () {
    return (
      <div className="PatientResourcesMenu">
        <section className="resources-frame">
          <div className="frame-menu">
            <div className="frame-menu__left-column">
              <div className="patient-additional">{this.props.patientResource.prefix} </div>
              <div className="patient-name">{this.props.patientResource.firstName} {this.props.patientResource.lastName}</div>
              <div className="patient-additional">{this.props.patientResource.city}, {this.props.patientResource.state} {this.props.patientResource.country}</div>
            </div>
            <div className="frame-menu__right-column">
              <div className="birth-date">Birth date: <strong>{new Date(this.props.patientResource.birthDate).toLocaleString()}</strong></div>
              <div className="birth-date">Marital status: <strong>{this.props.patientResource.maritalStatus}</strong></div>
            </div>
          </div>
          <div className="frame-resources">
            <div className="resource-column">
              <div className="resource resource-observation" onClick={()=>{this.props.handleClick('resourcesDetails', 0)}}>
                <div className="resource-name">Observations</div>
                <div className="resource-show-more">{this.props.observationBMIResource.length ? 'show more' : 'no resources'}</div>
              </div>
              {
                this.props.observationBMIResource
                  .sort((a,b) => {
                    console.log(new Date(b.values[0].issued));
                    console.log(new Date(a.values[0].issued));
                    new Date(b.values[0].issued) - new Date(a.values[0].issued)
                    })
                  .slice(0,5).map(observation => 
                  <div className="recent-resource" key={observation._id}>
                    <div className="recent-resource__dot"></div>
                    <div className="recent-resource__text">
                      <div className="resource-name">{observation.observation}</div>
                      <div className="resource-status">{new Date(observation.values[0].issued).toLocaleDateString()}</div>
                      <div className="resource-value">{observation.values[0].value.toFixed(2)} {observation.unit}</div>
                    </div>
                  </div>
                )
              }
              {
                !this.props.observationBMIResource.length ? <div className="no-more">no resources</div> : ''
              }
            </div>
            <div className="resource-column">
              <div className="resource resource-medication">
                <div className="resource-name">Medication Requests</div>
                <div className="resource-show-more">{this.props.medicationResource.length ? 'show more' : 'no resources'}</div>
              </div>
              {
                this.props.medicationResource
                  .sort((a,b) => new Date(b.authoredOn) - new Date(a.authoredOn))
                  .slice(0,5).map(medication => 
                  <div className="recent-resource" key={medication._id}>
                    <div className="recent-resource__dot"></div>
                    <div className="recent-resource__text">
                      <div className="resource-name">{medication.values[0].request}</div>
                      <div className="resource-status">{new Date(medication.authoredOn).toLocaleDateString()}</div>
                      <div className="resource-value">{medication.values[0].description}</div>
                    </div>
                  </div>
                )
              }
              {
                !this.props.medicationResource.length ? <div className="no-more">no resources</div> : ''
              }
            </div>
            <div className="resource-column">
            <div className="resource resource-condition">
              <div className="resource-name">Conditions</div>
              <div className="resource-show-more">{this.props.conditionResource.length ? 'show more' : 'no resources'}</div>
            </div>
            {
              this.props.conditionResource
                .sort((a,b) => new Date(b.assertedDate) - new Date(a.assertedDate))
                .slice(0,5).map(condition => 
                <div className="recent-resource" key={condition._id}>
                  <div className="recent-resource__dot"></div>
                  <div className="recent-resource__text">
                    <div className="resource-name">{condition.condition}</div>
                    <div className="resource-status">{new Date(condition.assertedDate).toLocaleDateString()}</div>
                    <div className="resource-value">{condition.verificationStatus}, {condition.clinicalStatus}</div>
                  </div>
                </div>
              )
            }
            {
              !this.props.conditionResource.length ? <div className="no-more">no resources</div> : ''
            }
          </div>
          </div>
        </section>
      </div>
    );
  }

}
 
// patientResource
// observationBodyHeightResource
// observationBodyWeightResourceRequest
// observationBMIResourceRequest
// observationHBA1CResourceRequest
// medicationResourceRequest
// conditionResourceRequest