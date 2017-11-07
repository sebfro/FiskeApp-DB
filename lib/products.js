import { Meteor } from 'meteor/meteor';
import { DDP } from 'meteor/ddp-client';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


//Produktene ligger i denne her
export const productsDB = new Mongo.Collection('productsDB');

if(Meteor.isServer){
    Meteor.publish('productsDB', function publishProducts() {
        return productsDB.find();
    });

    Meteor.publish('productsDBFindOne', function publishProduct(prodId) {
        console.log("Findone");
        console.log(productsDB.findOne({_id: prodId}));
        return productsDB.find({_id: prodId});
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
            bid: 0,
            isAvailable: true
        });
        console.log("insert complete");
    },

    'productsDB.remove'(prodId){
        check(prodId, String);
        productsDB.remove(prodId);
    },

    'productsDB.updateBid'(prodId, bid){
        console.log("in updatebid");

        let currBid = productsDB.findOne({_id: prodId}).bid;

        if(currBid < bid){
            productsDB.update({_id: prodId}, {$set: {bid: bid}});
        }
        console.log("updated bid");
    }
});