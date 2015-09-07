'use strict'

var roundsCollectionName = 'rounds';
var handsCollectionName = 'hands';

var Rounds = new Mongo.Collection(roundsCollectionName);
var Hands = new Mongo.Collection(handsCollectionName);

if (Meteor.isClient) {
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        
    });
}