import React, { Component } from 'react';
import AppHeader from '../../components/AppHeader/AppHeader';
import PatientContainer from '../../containers/PatientContainer';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <AppHeader />
        <PatientContainer />
      </div>
    );
  }
}

export default Home;
