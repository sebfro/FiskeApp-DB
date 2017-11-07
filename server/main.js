import '../imports/api/tasks.js';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


//Produktene ligger i denne her
export const productsDB = new Mongo.Collection('productsDB');

if(Meteor.isServer){
    Meteor.publish('productsDB', function publishProducts() {
        return productsDB.find();
    })

    Meteor.publish('productsDBFindOne', (prodId) => {
        return productsDB.findOne({id: prodId});
    })
}

//Metoder for å legge til produkter
Meteor.methods({
    'productsDB.insert'(prodName, prodPrice, prodDate, prodDesc){

        console.log("In insert");
        check(prodName, String);
        check(prodDesc, String);
        check(prodPrice, String);
        check(prodDate, String);

        if(!Meteor.userId()){
            throw new Meteor.Error('not authorized');
        }

        productsDB.insert({
            name: prodName,
            price: prodPrice,
            description: prodDesc,
            date: prodDate,
            seller: Meteor.userId(),
            isAvailable: true
        });
        console.log("insert complete");
    },

    'productsDB.remove'(prodId){
        check(prodId, String);
        productsDB.remove(prodId);
    }
});