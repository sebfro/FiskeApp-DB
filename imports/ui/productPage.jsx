import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {FormGroup, FormControl, ControlLabel, Button, Form, ListGroup, ListGroupItem, Grid, Row} from 'react-bootstrap';



import Header from './header.jsx';
import {checkDate} from "../../lib/helpMethods"

// App component - represents the whole app
class productPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validName : null,
            validDate : null,
            validDescription : null
        }
    }

    submitProduct(e) {
        e.preventDefault();
        if(this.props.currentUser){
            const prodName = ReactDOM.findDOMNode(this.refs.productName).value.trim();
            const prodDate = ReactDOM.findDOMNode(this.refs.productDate).value.trim();
            const prodDesc = ReactDOM.findDOMNode(this.refs.productDescription).value.trim();
            console.log(!checkDate(prodDate));
            if(prodName.match(/[a-zæøå]/i) && !checkDate(prodDate) && prodDesc.match(/[a-zæøå]/i)) {

                console.log(prodDate);
                Meteor.call('productsDB.insert', prodName, prodDate, prodDesc);

                FlowRouter.go('/');
            } else {
                this.setState({
                    validName : prodName.match(/[a-zæøå]/i) ? "success" : "error",
                    validDate : !checkDate(prodDate) ? "success" : "error",
                    validDescription : prodDesc.match(/[a-zæøå]/i) ? "success" : "error"
                })
            }
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
                                    <FormGroup validationState={this.state.validName}>
                                        <ControlLabel>Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            ref="productName"
                                            placeholder="Enter product name"
                                        />
                                    </FormGroup>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <FormGroup validationState={this.state.validDate}>
                                        <ControlLabel>Choose a date</ControlLabel>
                                        <FormControl
                                            type="date"
                                            ref="productDate"
                                        />
                                    </FormGroup>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <FormGroup validationState={this.state.validDescription}>
                                        <ControlLabel>Description</ControlLabel>
                                        <FormControl
                                            componentClass="textarea"
                                            placeholder="Enter the description"
                                            ref="productDescription"
                                        />
                                    </FormGroup>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button bsStyle="primary" onClick={this.submitProduct.bind(this)}>Submit</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Form>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, productPage);