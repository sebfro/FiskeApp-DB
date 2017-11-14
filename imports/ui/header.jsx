import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Navbar, Nav, NavItem} from 'react-bootstrap';


import AccountsUIWrapper from './AccountsUIWrapper.jsx';


// App component - represents the whole app
export default class Header extends Component {
    constructor(props) {
        super(props);
    }



    goToSubmitPage(e){
        e.preventDefault();
        FlowRouter.go('/submitPage');
    }


    goToHomePage(e){
        e.preventDefault();
        FlowRouter.go('/');
    }

    goToMyListings(e){
        e.preventDefault();
        FlowRouter.go('/myListings');
    }




    render() {
        return (
                    <Navbar>
                        <Nav>
                            <NavItem onClick={this.goToHomePage.bind(this)}>Home</NavItem>
                            <NavItem onClick={this.goToSubmitPage.bind(this)}>Submit product</NavItem>
                            <NavItem onClick={this.goToMyListings.bind(this)}>My products</NavItem>
                            <NavItem><AccountsUIWrapper/></NavItem>
                        </Nav>
                    </Navbar>
        );
    }
}