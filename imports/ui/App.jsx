import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';


import {Tasks} from '../api/tasks.js';
import {productsDB} from './../../lib/products.js';


import Task from './Task.jsx';
import ProductListing from './productListing.jsx';
import Header from './header.jsx';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('tasks.insert', text);

        //Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            const showPrivateButton = task.owner === currentUserId;

            return (
                <Task
                    key={task._id}
                    task={task}
                    showPrivateButton={showPrivateButton}
                />
            );
        });
    }

    goToProductPage(e){
        e.preventDefault();
        FlowRouter.go('/productPage');
    }

    renderProducts(){
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
            <div className="container">

                <Header/>

                <ul>
                    {this.renderProducts()}
                </ul>

                { this.props.currentUser ?
                    <ul>
                        {this.renderTasks()}
                    </ul> : ''
                }
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
        incompleteCount: Tasks.find({checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
}, App);