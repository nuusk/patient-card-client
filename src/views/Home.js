import React, { Component } from 'react';
import AppHeader from '../components/AppHeader/AppHeader';

class Home extends Component {
  componentWillMount() {
    fetch('https://rocky-inlet-84429.herokuapp.com/api/project', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ legoSetID: 10060 }) 
    }).then(a => a.json())
      .then(b => {
        console.log(b)
      });
  }

  render() {
    return (
      <div className="Home">
      <AppHeader />
        <p className="Home-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Home;
