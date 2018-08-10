import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class RestaurantsList extends Component{

     
    constructor(props) {
      super(props);
      this.state = { rightMenu: false }
      this.showRight = this.showRight.bind(this);
     }     

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
     <div id="side-bar" role="complementary" tabIndex="0">
        <button id="icon" onClick={this.showRight}><img src="icon.png"/></button>
        <div className={ this.state.rightMenu ? "sideBarDisplay" : "sideBarDisplayNone"} ref={right => this.right = right} alignment="right">
            <h3>10 best restaurants in Warsaw</h3>
            <div id="searching">
                <input 
                    id ="input" 
                    type="text" 
                    role="search"
                    tabIndex="1"
                    aria-labelledby="search for restaurants"
                    placeholder="Filter..." 
                    value={this.props.query} 
                    onChange ={(event) => updateQuery(event.target.value)}/>
            </div>

            <ul id="restaurants" aria-labelledby="list of restaurants">
                {showingRestaurants.map((location) => (
                    <li key={location.title} area-labelledby={location.title}
                        onClick={() => {showInfoWindow(location); hideRight()}}>
                        {location.title}
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
    }  
}  


export default RestaurantsList


