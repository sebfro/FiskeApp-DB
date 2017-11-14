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
    });
    Meteor.publish('productsDB.myListings', function publishProducts(){
        return productsDB.find({sellerId: Meteor.userId()});
    })
}

//Metoder for å legge til produkter
Meteor.methods({
    'productsDB.insert'(prodName, prodDate, prodDesc){

        console.log("In insert");
        check(prodName, String);
        check(prodDesc, String);
        check(prodDate, String);

        if(!Meteor.userId()){
            throw new Meteor.Error('not authorized');
        }

        productsDB.insert({
            name: prodName,
            description: prodDesc,
            date: prodDate,
            seller: Meteor.user().emails[0].address,
            sellerId: Meteor.userId(),
            buyerId: null,
            bid: 0,
            isAvailable: true
        });
        console.log("insert complete");
    },

    'productsDB.remove'(prodId){
        check(prodId, String);
        let userId = productsDB.findOne({_id: prodId}).sellerId;
        if(Meteor.userId() === userId){
            productsDB.remove(prodId);
        }
    },

    'productsDB.updateBid'(prodId, bid, buyer){
        console.log("in updatebid");

        let prod = productsDB.findOne({_id: prodId});

        if(prod.bid < bid && prod._id !== Meteor.userId()){
            if(prod.buyerId || prod.bid < bid && prod){
                productsDB.update({_id: prodId}, {$set: {bid: bid, buyerId: buyer}});
            }
        }
        console.log("updated bid");
    },

    'productsDB.updateIsAvailable'(prodId){
        let userId = productsDB.findOne({_id: prodId}).sellerId;
        console.log(Meteor.userId());
        console.log(userId);
        if(Meteor.userId() === userId){
            productsDB.update({_id: prodId}, {$set: {isAvailable: false}});
        }
    }
});