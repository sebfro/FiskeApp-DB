import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';


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



    render() {
        return (
            <div className="container">
                <Header/>
                <ul>
                    <li>
                        {this.props.products.name}
                    </li>
                    <li>
                        {this.props.products.price}
                    </li>
                    <li>
                        {this.props.products.date}
                    </li>
                    <li>
                        {this.props.products.description}
                    </li>
                </ul>
            </div>
        );
    }
}



export default createContainer(() => {
    let prodId = Session.get('prodId');
    console.log(prodId);
    Meteor.subscribe('productsDBFindOne', prodId );

    return {
        products: productsDB.findOne({_id: prodId}),
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
}, Product);
//Endret den over fra App til Product, skal være klassens navn