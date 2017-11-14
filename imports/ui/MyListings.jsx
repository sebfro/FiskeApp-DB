import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {PageHeader, Grid, Row, ListGroupItem, ListGroup} from 'react-bootstrap';

import {Tasks} from '../api/tasks.js';
import {productsDB} from './../../lib/products.js';


import Task from './Task.jsx';
import ProductListing from './productListing.jsx';
import Header from './header.jsx';

// MyListings component - represents the whole MyListings
class MyListings extends Component {
    constructor(props) {
        super(props);
    }

    renderProducts() {
        if(this.props.products[0] !== undefined){
            let date =  new Date();
            return this.props.products.map((prod) => {
                if(this.props.currentUser._id === prod.sellerId){
                    return (
                        <ProductListing
                            key={prod._id}
                            product={prod}
                        />
                    )
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

MyListings.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('tasks');
    Meteor.subscribe('productsDB.myListings');


    return {
        products: productsDB.find({sellerId: Meteor.userId()}, {sort: {date: 1}}).fetch(),
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
        currentUser: Meteor.user(),
    };
}, MyListings);