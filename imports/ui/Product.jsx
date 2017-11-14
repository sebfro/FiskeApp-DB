import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {ListGroupItem, ListGroup, Grid, Row, Form, FormGroup, FormControl, ButtonGroup, Button} from 'react-bootstrap';

import {Tasks} from '../api/tasks.js';
import {productsDB} from '../../lib/products.js';
import {checkDate} from "../../lib/helpMethods"

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
        Meteor.call('productsDB.updateBid', this.props.products._id, bid, this.props.currentUser);
        console.log(bid);
    }

    acceptBid(e){
        e.preventDefault();
        Meteor.call('productsDB.updateIsAvailable', this.props.products._id);
        console.log("Bid was accepted");
    }

    removeProduct(e){
        e.preventDefault();
        Meteor.call('productsDB.remove', this.props.products._id);
        FlowRouter.go('/myListings');
    }


    render() {
        let year = this.props.products.date.substring(0,4);
        let month = this.props.products.date.substring(5,7);
        let day = this.props.products.date.substring(8,10);
        console.log(year + "-" + month + "-" + day);
        console.log(this.props.products.buyerId);
        console.log(this.props.currentUser);
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
                        {this.props.currentUser !== this.props.products.sellerId ?
                        this.props.currentUser ?
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
                            </Form> : null
                            : null}
                    </Row>
                    { this.props.products.isAvailable || checkDate(this.props.products.date)?
                        this.props.currentUser === this.props.products.sellerId ?
                    this.props.products.buyerId ?
                        <Row>
                            <ListGroup>
                                <ListGroupItem>
                                    <Button onClick={this.acceptBid.bind(this)}>Accept bid</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Row> : null
                        : null
                    :
                        <Row>
                            <ListGroup>
                                <ListGroupItem>
                                    This product has been sold, would you like to remove it?
                                    <Button onClick={this.removeProduct.bind(this)}>Remove product</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Row>
                    }
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
        currentUser: Meteor.userId(),
    };
}, Product);
//Endret den over fra App til Product, skal være klassens navn