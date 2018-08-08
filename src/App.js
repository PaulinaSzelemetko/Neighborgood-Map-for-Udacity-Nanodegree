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
        {title: 'Borpince', location: {lat: 52.232532, lng: 21.014322}}
    ]};

  

render() {
    return (
      <div id="app">
      <RestaurantsList locations={this.state.locations}/>
      <Map locations={this.state.locations}/>
      </div>)
    }

}


export default App