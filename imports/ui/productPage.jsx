import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {FormGroup, FormControl, ControlLabel, Button, Form, ListGroup, ListGroupItem, Grid, Row} from 'react-bootstrap';

import {Tasks} from '../api/tasks.js';


import Header from './header.jsx';

// App component - represents the whole app
class productPage extends Component {
    constructor(props) {
        super(props);
    }

    submitProduct(e) {
        e.preventDefault();
        if(this.props.currentUser){
            const prodName = ReactDOM.findDOMNode(this.refs.productName).value.trim();
            const prodDate = ReactDOM.findDOMNode(this.refs.productDate).value.trim();
            const prodDesc = ReactDOM.findDOMNode(this.refs.productDescription).value.trim();

            console.log(prodDate);
            Meteor.call('productsDB.insert', prodName, prodDate, prodDesc);

            FlowRouter.go('/');
        } else {
            alert("You have to login to submit a product");
        }
    }

    render() {
        return (
            <div className="container">
                <Grid>
                    <Row>
                        <Header/>
                    </Row>

                    <Row>
                        <Form>
                            <ListGroup>
                                <ListGroupItem>
                                    <FormGroup>
                                        <ControlLabel>Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            ref="productName"
                                            placeholder="Enter product name"
                                        />
                                    </FormGroup>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <FormGroup>
                                        <ControlLabel>Choose a date</ControlLabel>
                                        <FormControl
                                            type="date"
                                            ref="productDate"
                                        />
                                    </FormGroup>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <FormGroup>
                                        <ControlLabel>Description</ControlLabel>
                                        <FormControl
                                            componentClass="textarea"
                                            placeholder="Enter the description"
                                            ref="productDescription"
                                        />
                                    </FormGroup>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button onClick={this.submitProduct.bind(this)}>Submit</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Form>
                    </Row>
                </Grid>
            </div>
        );
    }
}

productPage.propTypes = {
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('tasks');

    return {
        currentUser: Meteor.user(),
    };
}, productPage);