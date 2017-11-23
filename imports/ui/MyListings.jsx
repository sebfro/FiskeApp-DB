import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Grid, Row, ListGroupItem, ListGroup} from 'react-bootstrap';

import {productsDB} from './../../lib/products.js';


import ProductListing from './productListing.jsx';
import Header from './header.jsx';

// MyListings component - represents the whole MyListings
class MyListings extends Component {
    constructor(props) {
        super(props);
    }

    renderProducts() {
        if(this.props.products[0] !== undefined){
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
                <ListGroupItem header="Empty">
                    Couldn't find any listings
                </ListGroupItem>
            )
        }
    }

    render() {
        return (
            <div className="container">

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


export default createContainer(() => {
    Meteor.subscribe('productsDB.myListings');


    return {
        products: productsDB.find({sellerId: Meteor.userId()}, {sort: {date: 1}}).fetch(),
        currentUser: Meteor.user(),
    };
}, MyListings);