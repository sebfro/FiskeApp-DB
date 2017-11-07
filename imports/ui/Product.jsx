import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';


import {Tasks} from '../api/tasks.js';
import {productsDB} from '../../server/main'


import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

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
                <ul>
                    <li>
                        Name: {this.props.products.seller}
                    </li>
                    <li>
                        Description: {this.props.products.description}
                    </li>
                    <li>
                        Price: {this.props.products.price}
                    </li>
                    <li>
                        Date: {this.props.products.date}
                    </li>
                    <li>
                        Seller: {this.props.products.seller}
                    </li>
                </ul>
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
    Meteor.subscribe('productsDBFindOne');

    return {
        products: productsDB.findOne(Session.get('id')),
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
}, App);