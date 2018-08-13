import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';


const foursquare = require('react-foursquare')({
  clientID: '0PRP0H0FLFBQTQXZRFMYEIPEQK1FRD42ZI0AGW2N3F23B3KQ',
  clientSecret: '5DFMAE5PU01K500W11BUCRYBSWM0UN4O2TM13UAH4LIHP0KT'
});

class Map extends Component{
  
  state = {
    map: null,
    tips: []
  }

  constructor(props) {
    super(props);
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

  componentWillReceiveProps(newProps){
    const newState = {}
    let map = {}
    let markers = [];
    let tips = [];
    const params = {'venue_id': newProps.locations.venueID};

    if (newProps.isScriptLoadSucceed) {
    
    //loading map
      if(this.state.map) {
        map = this.state.map;
      } else {  
        //create map
        map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: 52.226972, lng: 21.003192}
        }); 
        
        newProps.locations.forEach(location => {
            
            foursquare.venues.getVenueTips(params).then((response) => {
                 tips.push({text: response.response.tips.items[0].text, title: location.title})
            }).then(() => this.setState({tips})).catch(e=>console.log(e))
        })
       
        newProps.locations.map(location => {
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

          markers.push(marker);
          
        })
        newState.map = map;
        newState.markers = markers;
        this.setState(newState);
      }

      //add info windows
      const populateInfoWindow = (marker, infowindow) => {
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent(<div> <p>${this.state.tips[0].text}</p> </div>);
          infowindow.open(map, marker);
          marker.setIcon(highlightedIcon);
  
          infowindow.addListener('closeclick', function(){
            infowindow.setMarker = null;
          });
          }
      }
  
      //add markers and events on them 
      var infowindow = new window.google.maps.InfoWindow();
      var defaultIcon = this.makeMarkerIcon('0091ff');
      var highlightedIcon = this.makeMarkerIcon('FFFF24');   
      var query = newProps.query;
  
      newProps.locations.filter((location) =>  {
        if(query === '') {
           return true;
        }
        return location.title.toLowerCase().includes(query.toLowerCase())
      }).map(location => {
        var marker = new window.google.maps.Marker({
          position: location.location,
          name : location.title,
          map: map,
          icon: defaultIcon,
          animation: window.google.maps.Animation.DROP
        });
        
        if(location.clicked) {
          populateInfoWindow(marker, infowindow);
        }

        marker.addListener('click', function() {
          newProps.showInfoWindow(location); 
        });
        
        marker.addListener('mouseover', function() {
          this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
          this.setIcon(defaultIcon);
        })
      })
    } else {
      alert("script not loaded")
    }       

  }
        

  render(){
    return(
      <div>
        <div id="map" role="application" tabIndex="-1"></div>
    </div>        
    )
  }  
}  

// SCRIPT LOADER
export default scriptLoader(
  ["https://maps.googleapis.com/maps/api/js?key=AIzaSyBNK1Zmc5uNa3SRpQBCcWyHfSIMRyAF7_w"]
  )(Map)
    
    