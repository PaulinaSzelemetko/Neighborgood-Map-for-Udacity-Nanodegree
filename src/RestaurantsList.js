import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class RestaurantsList extends Component{

     
    constructor(props) {
      super(props);
     }     


    render(){
        let showingRestaurants
        if (this.props.query) {
            const match = new RegExp(escapeRegExp(this.props.query), 'i' )
            showingRestaurants = this.props.locations.filter((location) => match.test(location.title));
        } else {
            showingRestaurants = this.props.locations
        }


        const updateQuery = this.props.updateQuery;

    return(
       
       <div id="list">
            <h3>10 best restaurants in Warsaw</h3>
            <div id="searching">
                <input 
                    id ="input" 
                    type="text" 
                    placeholder="Filter..." 
                    value={this.props.query} 
                    onChange ={(event) => updateQuery(event.target.value)}/>
            </div>

            <ul id="restaurants">
                {showingRestaurants.map((location) => (
                    <li key={location.title}>
                        {location.title}
                    </li>
                ))}
            </ul>
       </div>
    )
    }  
}  


export default RestaurantsList


