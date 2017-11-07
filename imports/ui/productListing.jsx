import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';

// Task component - represents a single todo item
export default class ProductListing extends Component {

    openProduct(e){
        e.preventDefault();

        Session.set('prodId', this.props.product._id);
        console.log("Session has been set to" + this.props.product._id);
        FlowRouter.go('/productpage');
    }

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in css
        // The problem might be here
        return (
            <li onClick={this.openProduct.bind(this)}>
                {this.props.product.name}
            </li>
        );
    }
}

ProductListing.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    product: PropTypes.object.isRequired,
};