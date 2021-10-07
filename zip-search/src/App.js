import React, { Component } from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';

function City(props) {
  return (
    <div>
      <Card style={{width:'35rem'}}className="mx-auto my-3">
        <Card.Header>
          { props.cityInfo.LocationText }
        </Card.Header>
        <Card.Body>
          <ul>
            <li>{ "State: " + props.cityInfo.State }</li>
            <li>{ "Location: (" + props.cityInfo.Lat+", " + props.cityInfo.Long + ")"}</li>
            <li>{ "Population (estimated): " + props.cityInfo.EstimatedPopulation}</li>
            <li>{ "Total Wages: " + props.cityInfo.TotalWages }</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div>
      <label for="zip-code-field" className ="zip-code-enter">Zip Code:</label>
      <input type = "text" id = "zip-code-field" onChange = {props.zipcode}></input>
    </div>
  );
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      zipCode: "",
      cities: []
    }
  }

  zipChange = (e) => {
    this.setState({zipCode: e.target.value});
    if(e.target.value.length === 5){
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + e.target.value)
      .then((response) => 
        response.json()
      )
      .then((data) => {
        this.setState({cities: data,});
        console.log(this.state.cities);
      })
    }
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField setzip = {this.state.zipCode} zipcode = {this.zipChange}/>
        <div>
          {this.state.cities.map(obj => (<City key={obj.RecordNumber} cityInfo={obj} />))}
        </div>
      </div>
    );
  }
}

export default App;
