import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {ListGroupItem} from 'react-bootstrap';


export default class ProductListing extends Component {
    constructor(props){
        super(props);
    }
    openProduct(e){
        e.preventDefault();

        Session.set('prodId', this.props.product._id);
        console.log("Session has been set to" + this.props.product._id);
        FlowRouter.go('/productpage');
    }



    render() {
        return (
            <ListGroupItem header={this.props.product.name} onClick={this.openProduct.bind(this)}>
                {this.props.product.bid ? "Current bid: " + this.props.product.bid + ", " : null }Experation date: {this.props.product.date}
            </ListGroupItem>
        );
    }
}