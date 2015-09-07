﻿'use strict'

var cardsCollectionName = 'cards';
var Cards = new Mongo.Collection(cardsCollectionName);

if (Meteor.isClient) {
    Meteor.subscribe(cardsCollectionName);

    Template.cards.helpers({
        cards: function () {
            return Cards.find();
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        Meteor.call('seedCards')
    });

    Meteor.publish(cardsCollectionName, function () {
        return Cards.find();
    });
}

Meteor.methods({
    seedCards: function() {
        var allCards = Cards.find().fetch();

        allCards.forEach(function(card) {
            Cards.remove(card);
        });

        Cards.insert({ Label: "1", Value: 1 })
        Cards.insert({ Label: "2", Value: 2 })
        Cards.insert({ Label: "3", Value: 3 })
        Cards.insert({ Label: "5", Value: 5 })
        Cards.insert({ Label: "8", Value: 8 })
        Cards.insert({ Label: "13", Value: 13 })
        Cards.insert({ Label: "20", Value: 20 })
        Cards.insert({ Label: "40", Value: 40 })
        Cards.insert({ Label: "100", Value: 100 })
        Cards.insert({ Label: "∞", Value: 0 })
        Cards.insert({ Label: "?", Value: 0 })
    }
});