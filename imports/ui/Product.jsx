import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';


import {Tasks} from '../api/tasks.js';


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
                        Name: {this.props.tasks}
                    </li>
                    <li>
                        Description: {this.props.tasks}
                    </li>
                    <li>
                        Price: {this.props.tasks}
                    </li>
                    <li>
                        Date: {this.props.tasks}
                    </li>
                    <li>
                        Seller: {this.props.tasks}
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
    Meteor.subscribe('pro');

    return {
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
}, App);