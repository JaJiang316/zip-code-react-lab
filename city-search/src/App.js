import './App.css';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

function Zip(props) {
  return (
    <div>
      <Card className="mx-auto my-3">
        <Card.Body>
          <p>Zip Code: {props.zipInfo}</p>
        </Card.Body>
      </Card>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div>
      <label for="zip-code-field" className ="zip-code-enter">City:</label>
      <input type = "text" id = "zip-code-field" onChange = {props.zipcode}></input>
    </div>
  );
}

function CitySearch() {

  const [city, setCity] = useState("");
  const [zips, setZip] = useState([]);

  function zipChange(e) {
    setCity(e.target.value);
    if(e.target.value.length > 3){
      fetch('http://ctp-zip-api.herokuapp.com/city/' + e.target.value.toUpperCase())
      .then((response) => 
        response.json()
      )
      .then((data) => {
        setZip(data);
        console.log(data);
      })
    }
  }
  
  return (
    <div className="App">
      <div className="App-header">
        <h2>City Search</h2>
      </div>
      <ZipSearchField setzip = {city} zipcode = {zipChange}/>
      <div className = "card">
        {zips.map(obj => (<Zip zipInfo={obj} />))}
      </div>
    </div>
  );
}

export default CitySearch;
