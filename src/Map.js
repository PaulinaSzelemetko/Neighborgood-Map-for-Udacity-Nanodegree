import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import App from './App'

class Map extends Component{
    constructor(props) {
        super(props);
    }
    
    componentWillReceiveProps({isScriptLoadSucceed}){
        if (isScriptLoadSucceed) {
            

            var map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: {lat: 52.243025, lng: 21.014490}
            });
        }
        else{
            alert("script not loaded")
        }
    }

    render(){
        return(
            <div>
                <div id="map"></div>
            </div>
        )
    }
}

export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyBNK1Zmc5uNa3SRpQBCcWyHfSIMRyAF7_w"]
)(Map)

