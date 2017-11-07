import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {PageHeader, Grid, Row, ButtonToolbar, Button, ButtonGroup, ListGroup} from 'react-bootstrap';

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
        let productsList = this.props.products;
        return productsList.map((prod) => {
            return (
                <ProductListing
                    key={prod._id}
                    product={prod}
                />
            )
        })
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

App.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('tasks');
    Meteor.subscribe('productsDB');


    return {
        products: productsDB.find({}).fetch(),
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
        currentUser: Meteor.user(),
    };
}, App);