import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';

//foursquare data
const foursquare = require('react-foursquare')({
  clientID: '0PRP0H0FLFBQTQXZRFMYEIPEQK1FRD42ZI0AGW2N3F23B3KQ',
  clientSecret: '5DFMAE5PU01K500W11BUCRYBSWM0UN4O2TM13UAH4LIHP0KT'
});

window.gm_authFailure = () => { const mapSection = document.querySelector('#map'); mapSection.innerHTML = 'Sorry but we were unable to load the map. Please try again later.';}

class Map extends Component{
  
  state = {
    map: null,
    tips: [],
    infoWindow: {},
    markers: []
  }

  //function making marker color 
  makeMarkerIcon (markerColor) {
    var markerImage = new window.google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
        new window.google.maps.Size(21, 34),
        new window.google.maps.Point(0, 0),
        new window.google.maps.Point(10, 34),
        new window.google.maps.Size(21,34));
    return markerImage;
  }


  //function making info windows and adding content to them
  populateInfoWindow = (marker, infoWindow, map) => {
    
    let tips = this.state.tips;

    if (infoWindow.marker !== marker) {
      infoWindow.marker = marker;
      tips = tips.filter((tip) => tip.title === marker.name);
      infoWindow.setContent(`
          <div>
            <p>${marker.name}</p>
            <p>${tips[0] ? tips[0].text : "Sorry, we were unable to retrieve tips for this restaurant."}</p>
          </div>`
        );
      infoWindow.open(map, marker);
      infoWindow.addListener('closeclick', function(){
      infoWindow.setMarker = null;
      });
    }
  }

  componenetDidCatch(error, info) {

  }
      
  componentDidMount( ) {
    let tips = [];
    let locations = this.props.locations;

    //getting response from foursquare api
    locations.forEach(location => {      
      let params = {'venue_id': location.venueID};
      foursquare.venues.getVenueTips(params).then((response) => {
        tips.push({
          text: response.response.tips.items[0].text,
           title: location.title})
      })
      .then(() => this.setState({tips}))
      .catch(e => {})
    })
  }


  componentWillReceiveProps(newProps){
    const newState = {}

    let map = {}
    let markers = [];
    let infoWindow = {};

    let query = newProps.query;
    let locations = newProps.locations;
    
    let defaultIcon = {};
    let highlightedIcon = {};   
        
    if (newProps.isScriptLoadSucceed) {    
    //loading map
      if(this.state.map) {
        map = this.state.map;
        markers = this.state.markers;
        infoWindow = this.state.infoWindow;
      } else {  
        //creating map
        map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: 52.226972, lng: 21.003192}
        }); 
        
        defaultIcon = this.makeMarkerIcon('0091ff');
        highlightedIcon = this.makeMarkerIcon('FFFF24');
        //creating markers and adding events on them
        markers = locations.map(location => {
          var marker = new window.google.maps.Marker({
            position: location.location,
            name : location.title,
            map: map,
            icon: defaultIcon,
            animation: window.google.maps.Animation.DROP
          });
  
          marker.addListener('click', function() {
            newProps.showInfoWindow(location); 
          });
          
          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });

          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          })
          
          return marker;
        });

        infoWindow = new window.google.maps.InfoWindow();
      }


      //searching and filtering restaurants
      markers = markers.map(marker =>  {
        if(query === '' || 
          marker.name.toLowerCase().includes(query.toLowerCase())) {
            if(marker.map === null) {
              marker.setMap(map);
            }
        } else {
          marker.setMap(null);
        }

        if(marker.name === newProps.clickedLocation) {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          this.populateInfoWindow(marker, infoWindow, map);
        } else {
          marker.setAnimation(null);
        }

        return marker;
      });

      newState.markers = markers;
      newState.map = map;
      newState.infoWindow = infoWindow;
      this.setState(newState); 
    } else {
        alert("script not loaded")
    }  
  }       

  render(){ 
    return(
      <div>
        <div id="map" role="application">Sorry, there has been an error loading the map. Please try again later.</div>
    </div>        
    )
  }  
}  


// SCRIPT LOADER
export default scriptLoader(
  ["https://maps.googleapis.com/maps/api/js?key=AIzaSyBNK1Zmc5uNa3SRpQBCcWyHfSIMRyAF7_w"]
  )(Map)
    
    