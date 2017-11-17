import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Grid, Row, ListGroupItem, ListGroup, Button} from 'react-bootstrap';

import {productsDB} from './../../lib/products.js';
import {Loading_feedback} from "./commonComponents"

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
            <div className="container">

            <Grid>
                <Row>
                    <Header/>
                </Row>
                <Row>
                    <ListGroup>
                        {this.props.products ?
                            this.renderProducts()
                            : <Loading_feedback/>
                        }
                    </ListGroup>
                </Row>
            </Grid>
            </div>
        );
    }
}


export default createContainer(() => {
    Meteor.subscribe('productsDB');


    return {
        products: productsDB.find({}, {sort: {date: 1}}).fetch(),
        currentUser: Meteor.user(),
    };
}, App);