import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class RestaurantsList extends Component{

     
    constructor(props) {
      super(props);
     }     


     state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }


    render(){
        let showingRestaurants
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i' )
            showingRestaurants = this.props.locations.filter((location) => match.test(location.title))
        } else {
            showingRestaurants = this.props.locations
        }


    return(
       
       <div id="list">
            <h3>5 best restaurants in Warsaw</h3>
            <div id="searching">
                <input 
                    id ="input" 
                    type="text" 
                    placeholder="Filter..." 
                    value={this.state.query} 
                    onChange ={(event) => this.updateQuery(event.target.value)}/>
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


