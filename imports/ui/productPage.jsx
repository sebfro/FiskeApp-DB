import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {FormGroup, FormControl, ControlLabel, Button, Form} from 'react-bootstrap';


import {Tasks} from '../api/tasks.js';


import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

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

    submitProduct(e){
        e.preventDefault();
        const prodName = ReactDOM.findDOMNode(this.refs.productName).value.trim();
        const prodPrice = ReactDOM.findDOMNode(this.refs.productPrice).value.trim();
        const prodDate = ReactDOM.findDOMNode(this.refs.productDate).value.trim();
        const prodDesc = ReactDOM.findDOMNode(this.refs.productDescription).value.trim();

        console.log(typeof prodName);
        console.log(typeof prodPrice);
        console.log(typeof prodDate);
        console.log(typeof prodDesc);

        Meteor.call('productsDB.insert', prodName, prodPrice, prodDate, prodDesc);
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Submit product</h1>
                </header>

                <Form>
                <ul>
                    <li>
                        <input
                        type="text"
                        ref="productName"
                        placeholder="Enter product name"
                        />
                    </li>
                    <li>
                        <input
                            type="number"
                            ref="productPrice"
                            placeholder="Enter product price"
                        />
                    </li>
                    <li>
                        <FormGroup>
                            <ControlLabel>Choose a date</ControlLabel>
                            <FormControl
                                type="date"
                                ref="productDate"
                            />
                        </FormGroup>
                    </li>
                    <li>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                placeholder="Enter the description"
                                ref="productDescription"
                            />
                        </FormGroup>
                    </li>
                    <li>
                        <Button onClick={this.submitProduct.bind(this)}>Submit</Button>
                    </li>
                </ul>
                </Form>
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

    return {
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
}, App);