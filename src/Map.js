import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';




class Map extends Component{

    
  constructor(props) {
    super(props);
   }        
              
    // ADD MAP AND MARKERS   
    
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

  


  componentWillReceiveProps({isScriptLoadSucceed}){
    if (isScriptLoadSucceed) {
    
  //loading map 
    var map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 52.243025, lng: 21.014490}
    });  
  } else {
    alert("script not loaded")
  }       

  //add markers and events on them (changing color)
  var markers = [];
  var defaultIcon = this.makeMarkerIcon('0091ff');
  var highlightedIcon = this.makeMarkerIcon('FFFF24');    
  this.props.locations.map(location => {
    
    var marker = new window.google.maps.Marker({
      position: location.location,
      name : location.title,
      map: map,
      icon: defaultIcon,
      animation: window.google.maps.Animation.DROP,
    });
    
    markers.push(marker);

    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
  })
  })
  }
        

  render(){
    return(
      <div>
        <div id="map"></div>
    </div>        
    )
  }  
}  

// SCRIPT LOADER
export default scriptLoader(
  ["https://maps.googleapis.com/maps/api/js?key=AIzaSyBNK1Zmc5uNa3SRpQBCcWyHfSIMRyAF7_w"]
  )(Map)
    
    