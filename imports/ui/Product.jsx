import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {ListGroupItem, ListGroup, Grid, Row, Form, FormGroup, FormControl, ButtonGroup, Button} from 'react-bootstrap';

import {Tasks} from '../api/tasks.js';
import {productsDB} from '../../lib/products.js';


import Header from './header.jsx';

// App component - represents the whole app
class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }

    makeBid(e) {
        e.preventDefault();
        const bid = ReactDOM.findDOMNode(this.refs.productBid).value.trim();
        Meteor.call('productsDB.updateBid', this.props.products._id, bid);
        console.log(bid);
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
                            <ListGroupItem>
                                Name: {this.props.products.name}
                            </ListGroupItem>
                            <ListGroupItem>
                                Seller: {this.props.products.seller}
                            </ListGroupItem>
                            <ListGroupItem>
                                Price: {this.props.products.price}
                            </ListGroupItem>
                            <ListGroupItem>
                                Current bid: {this.props.products.bid}
                            </ListGroupItem>
                            <ListGroupItem>
                                Date: {this.props.products.date}
                            </ListGroupItem>
                            <ListGroupItem>
                                Description: {this.props.products.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Row>
                    <Row>
                        <Form>

                            <ListGroup>
                                <ListGroupItem>
                                    <FormGroup>
                                        <FormControl type="number" ref="productBid" placeholder="Enter bid"/>
                                    </FormGroup>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button onClick={this.makeBid.bind(this)}>
                                        Make bid
                                    </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Form>
                    </Row>
                </Grid>
            </div>
        );
    }
}


export default createContainer(() => {
    let prodId = Session.get('prodId');
    console.log(prodId);
    Meteor.subscribe('productsDBFindOne', prodId);

    return {
        products: productsDB.findOne({_id: prodId}),
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
        currentUser: Meteor.user(),
    };
}, Product);
//Endret den over fra App til Product, skal være klassens navn