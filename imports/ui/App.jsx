import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Grid, Row, ListGroupItem, ListGroup} from 'react-bootstrap';

import {Tasks} from '../api/tasks.js';
import {productsDB} from './../../lib/products.js';


import Task from './Task.jsx';
import ProductListing from './productListing.jsx';
import Header from './header.jsx';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);
    }

    renderProducts() {
        if(this.props.products[0] !== undefined){
            let date =  new Date();
            return this.props.products.map((prod) => {
                if(prod.date.substring(0,4) >= date.getFullYear().toString() &&
                    prod.date.substring(5,7) >= (date.getMonth()+1).toString() &&
                    prod.date.substring(8,10) >= date.getDate().toString()){
                    if(prod.isAvailable){
                        return (
                            <ProductListing
                                key={prod._id}
                                product={prod}
                            />
                        )
                    }
                }
            })
        } else {
            return (
                <ListGroupItem>
                    Couldn't find any listings
                </ListGroupItem>
            )
        }
    }

    render() {
        let date =  new Date();
        let temp = date.getFullYear().toString() + "-" + (date.getMonth()+1).toString() + "-" + date.getDate().toString();
        console.log(temp);


        return (
            <div className="map-container">

            <Grid>
                <Row>
                    <Header/>
                </Row>
                <Row>
                    <ListGroup>
                        {this.renderProducts()}
                    </ListGroup>
                </Row>
            </Grid>
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('tasks');
    Meteor.subscribe('productsDB');


    return {
        products: productsDB.find({}, {sort: {date: 1}}).fetch(),
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
        currentUser: Meteor.user(),
    };
}, App);