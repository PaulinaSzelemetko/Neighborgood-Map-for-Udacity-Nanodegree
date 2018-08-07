import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';




class Map extends Component{
  
  constructor(props) {
    super(props);
    this.state = {locations: 
            [
            {title: 'El Popo', location: {lat: 52.243531, lng: 21.007246}},  
            {title: 'Thaisty', location: {lat: 52.243152, lng: 21.003403}},
            {title: 'Street', location: {lat: 52.257631, lng: 20.984815}},
            {title: 'Łuski i Ości', location: {lat: 52.261264, lng: 20.990815}},
            {title: 'Borpince', location: {lat: 52.232532, lng: 21.014322}}
          ]};
        }        
        
        
        
        // ADD MAPS AND MARKER        
      
           
      componentWillReceiveProps({isScriptLoadSucceed}){
      if (isScriptLoadSucceed) {
            
        
        var map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 52.243025, lng: 21.014490}
        });  
        }    
        else{
            alert("script not loaded")
        }  

        
        var markers = [];
        // var defaultIcon = makeMarkerIcon('0091ff');
        // var highlightedIcon = makeMarkerIcon('FFFF24');
           
            
        this.state.locations.map(location => {
            
        var marker = new window.google.maps.Marker({
        position: location.location,
        name : location.title,
        map: map,
        // icon: defaultIcon,
        animation: window.google.maps.Animation.DROP,
        });
              
        markers.push(marker);
        })


        // makeMarkerIcon(markerColor) {
        //   var markerImage = new google.maps.MarkerImage(
        //       'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
        //     '|40|_|%E2%80%A2',
        //     new google.maps.Size(21, 34),
        //     new google.maps.Point(0, 0),
        //     new google.maps.Point(10, 34),
        //     new google.maps.Size(21,34));
        //   return markerImage;
        // }
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
    
    