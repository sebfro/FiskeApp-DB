import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';


import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    goToProductPage(e){
        e.preventDefault();
        FlowRouter.go('/productPage');
    }

    render() {
        return (
                <header>

                    <h1>Auction house</h1>
                    <button onClick={this.goToProductPage.bind(this)}>test</button>

                    <AccountsUIWrapper/>
                </header>
        );
    }
}