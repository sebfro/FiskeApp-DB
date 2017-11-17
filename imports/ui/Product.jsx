import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {ListGroupItem, ListGroup, Grid, Row, Form, FormGroup, FormControl, Button} from 'react-bootstrap';

import {productsDB} from '../../lib/products.js';
import {checkDate} from "../../lib/helpMethods"

import Header from './header.jsx';

// App component - represents the whole app
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validBid : null
        }
    }

    makeBid(e) {
        e.preventDefault();
        const bid = ReactDOM.findDOMNode(this.refs.productBid).value.trim();
        if(bid > this.props.products.bid && this.props.products.buyerId !== this.props.currentUser){
            Meteor.call('productsDB.updateBid', this.props.products._id, bid, this.props.currentUser);
        }
        this.setState({
            validBid : bid > this.props.products.bid ? "success" : "error"
        });
        if (this.props.products.buyerId === this.props.currentUser){
            alert("You already have the highest bid.");
            this.setState({
                validBid : null
            })
        }

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
        if(this.props.products) {
            return (
                <div className="container">
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
                                                <FormGroup validationState={this.state.validBid}>
                                                    <FormControl type="number" ref="productBid"
                                                                 placeholder="Enter bid"/>
                                                </FormGroup>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Button bsStyle="primary" onClick={this.makeBid.bind(this)}>
                                                    Make bid
                                                </Button>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </Form> : null
                                : null}
                        </Row>
                        {this.props.products.isAvailable || checkDate(this.props.products.date) ?
                            this.props.currentUser === this.props.products.sellerId ?
                                this.props.products.buyerId ?
                                    <Row>
                                        <ListGroup>
                                            <ListGroupItem>
                                                <Button bsStyle="primary" onClick={this.acceptBid.bind(this)}>Accept
                                                    bid</Button>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </Row> : null
                                : null
                            :
                            <Row>
                                <ListGroup>
                                    <ListGroupItem>
                                        This product has been sold, would you like to remove it?
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Button bsStyle="primary" onClick={this.removeProduct.bind(this)}>Remove
                                            product</Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Row>
                        }
                    </Grid>
                </div>
            );
        } else {
            FlowRouter.go('/');
        }
    }
}


export default createContainer(() => {
    let prodId = Session.get('prodId');
    console.log(prodId);
    Meteor.subscribe('productsDBFindOne', prodId);

    return {
        products: productsDB.findOne({_id: prodId}),
        currentUser: Meteor.userId(),
    };
}, Product);
//Endret den over fra App til Product, skal være klassens navn