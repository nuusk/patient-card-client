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
            <div className="frame-menu__right-column"></div>
          </div>
          <div className="frame-resources">
            <div className="resource-column">
              <div className="resource resource-observation">
                <div className="resource-name">Observations</div>
                <div className="resource-show-more">show more</div>
              </div>
              {
                this.props.observationBMIResource
                  .sort((a,b) => new Date(b.effectiveDateTime) - new Date(a.effectiveDateTime))
                  .slice(0,5).map(observation => 
                  <div className="recent-resource" key={observation._id}>
                    <div className="recent-resource__dot"></div>
                    <div className="recent-resource__text">
                      <div className="resource-name">{observation.observation}</div>
                      <div className="resource-status">{new Date(observation.effectiveDateTime).toLocaleDateString()}</div>
                      <div className="resource-value">{observation.values[0].value.toFixed(2)} {observation.unit}</div>
                    </div>
                  </div>
                )
              }
            </div>
            <div className="resource resource-medicationRequest">
              <div className="resource-name">Medication Requests</div>
              <div className="resource-show-more">show more</div>
              {

              }
            </div>
            <div className="resource resource-condition">
              <div className="resource-name">Conditions</div>
              <div className="resource-show-more">show more</div>
              {

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