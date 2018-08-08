import React from 'react'
import './App.css'
import Map from './Map'
import RestaurantsList from './RestaurantsList'

class App extends React.Component {

  state = {
    locations: 
      [
        {title: 'El Popo', location: {lat: 52.243531, lng: 21.007246}},  
        {title: 'Thaisty', location: {lat: 52.243152, lng: 21.003403}},
        {title: 'Street', location: {lat: 52.257631, lng: 20.984815}},
        {title: 'Łuski i Ości', location: {lat: 52.261264, lng: 20.990815}},
        {title: 'N31 restaurant&bar', location: {lat: 52.229008, lng: 21.013060}},
        {title: 'MEZZE hummus & falafel', location: {lat: 52.203477, lng: 21.022602}},
        {title: 'Soto Sushi', location: {lat: 52.220647, lng: 21.016019}},
        {title: 'Atelier Amaro', location: {lat: 52.218920, lng: 21.026988}},
        {title: 'Platter by Karol Okrasa', location: {lat: 52.232470, lng: 21.002796}},
        {title: 'Borpince', location: {lat: 52.232532, lng: 21.014322}}
    ],
    query: ''
  };

  showInfoWindow = (targetLocation) => {
    const locations = [...this.state.locations];
    locations.map(location => {
      if(location.title === targetLocation.title) {
        location.clicked = true;
      } else {
        location.clicked = false;
      }
    })
    this.setState(locations)
  }

  updateQuery = (query) => {
      this.setState({ query: query.trim() })
  }  

render() {
    return (
      <div id="app">
      <RestaurantsList 
        locations={this.state.locations}
        query={this.state.query}
        updateQuery={this.updateQuery}
        showInfoWindow={this.showInfoWindow}
        />
      <Map 
        locations={this.state.locations}
        query={this.state.query}
        showInfoWindow={this.showInfoWindow}
      />
      </div>)
    }

}


export default App