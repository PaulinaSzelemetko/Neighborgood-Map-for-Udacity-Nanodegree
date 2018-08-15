import React from 'react'
import './App.css'
import Map from './Map'
import RestaurantsList from './RestaurantsList'


class App extends React.Component {

  state = {
    locations: 
      [
        {title: 'El Popo', venueID: '4bbb7e9bc585a5930750b6b7', location: {lat: 52.243552, lng: 21.007285}},  
        {title: 'Thaisty', venueID: '555082cd498e1ed2ce2c2cbd', location: {lat: 52.24297442972257, lng: 21.002883850918693}},
        {title: 'Street', venueUD: '4e09f6bd8877394591f6cab8', location: {lat: 52.257631, lng: 20.984815}},
        {title: 'Łuski i Ości', venueID: '54e78e91498e7116ea42dc0e', location: {lat: 52.261264, lng: 20.990815}},
        {title: 'N31 restaurant&bar', venueID: '562fcc8d498eebd6fb16ec1a', location: {lat: 52.229008, lng: 21.013060}},
        {title: 'MEZZE hummus & falafel', venueID: '52489a0911d200b001fa7fd1', location: {lat: 52.203477, lng: 21.022602}},
        {title: 'Atelier Amaro', venueID: '4e738918b0fb38bb72f02590', location: {lat: 52.218920, lng: 21.026988}},
        {title: 'Pełną Parą', venueID: '54d643ae498e84070438a7e5', location: {lat: 52.23048573788216, lng: 20.99445480101361}},
        {title: 'Platter by Karol Okrasa', venueID: '5008648ee4b05525ca864aef', location: {lat: 52.232470, lng: 21.002796}},
        {title: 'Borpince', venueID: '4c6312434b5176b0c0380e17', location: {lat: 52.232532, lng: 21.014322}}
       ],
    query: '',
    clickedLocation: ''
  };

  showInfoWindow = (targetLocation) => {
    let newState =  { clickedLocation: targetLocation.title};
    this.setState(newState)
  }

  updateQuery = (query) => {
      this.setState({ query: query.trim() })
  }  

render() {
    return (
      <main id="app" role="main">
      <RestaurantsList 
        locations={this.state.locations}
        query={this.state.query}
        updateQuery={this.updateQuery}
        showInfoWindow={this.showInfoWindow}
        />
      <Map 
        locations={this.state.locations}
        query={this.state.query}
        clickedLocation={this.state.clickedLocation}
        showInfoWindow={this.showInfoWindow}
      />
      </main>)
    }

}


export default App