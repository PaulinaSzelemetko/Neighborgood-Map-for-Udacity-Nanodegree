import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'

class RestaurantsList extends Component{
     
    constructor(props) {
      super(props);
      this.state = { rightMenu: false }
      this.showRight = this.showRight.bind(this);
     }     

    //function showing and hiding side menu with restaurants list
    showRight = () => {
        this.setState({ rightMenu: !this.state.rightMenu })
      }

    hideRight = () => {
        this.setState({ rightMenu: false})
    }    

    render(){
        let showingRestaurants
        if (this.props.query) {
            const match = new RegExp(escapeRegExp(this.props.query), 'i' )
            showingRestaurants = this.props.locations.filter((location) => match.test(location.title));
        } else {
            showingRestaurants = this.props.locations
        }

        const hideRight = this.hideRight;
        const updateQuery = this.props.updateQuery;
        const showInfoWindow = this.props.showInfoWindow;

    return(
     <nav id="side-bar" role="complementary" tabIndex="0">
        <button id="icon" onClick={this.showRight}><img src="icon.png" alt="hamburger menu icon"/></button>
        <div className={ this.state.rightMenu ? "sideBarDisplay" : "sideBarDisplayNone"} ref={right => this.right = right} alignment="right">
            <h3>10 best restaurants in Warsaw</h3>
            <div id="searching">
                <input 
                    id ="input" 
                    type="text" 
                    role="search"
                    tabIndex="0"
                    aria-label="search"
                    placeholder="Filter..." 
                    value={this.props.query} 
                    onChange ={(event) => updateQuery(event.target.value)}/>
            </div>

            <ul id="restaurants" aria-labelledby="restaurants">
                {showingRestaurants.map((location) => (
                    <li key={location.title} aria-labelledby="restaurants" tabIndex="0" role="button" onKeyPress={() => {showInfoWindow(location); hideRight()}}
                        onClick={() => {showInfoWindow(location); hideRight()}}>
                        {location.title}
                    </li>
                ))}
            </ul>
        </div>
    </nav>
    )
    }  
}  


export default RestaurantsList


