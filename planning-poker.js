'use strict'

var cardsCollectionName = 'cards';
var sessionsCollectionName = 'sessions';
var roundsCollectionName = 'rounds';
var handsCollectionName = 'hands';

var Cards = new Mongo.Collection(cardsCollectionName);
var Sessions = new Mongo.Collection(sessionsCollectionName);
var Rounds = new Mongo.Collection(roundsCollectionName);
var Hands = new Mongo.Collection(handsCollectionName);

if (Meteor.isClient) {
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });

    Meteor.subscribe(cardsCollectionName);
    Meteor.subscribe(sessionsCollectionName);

    Template.playerPage.helpers({
        cards: function () {
            return Cards.find();
        }
    });

    Template.sessions.helpers({
        sessions: function () {
            return Sessions.find();
        }
    });

    Template.sessions.events({
        'submit .new-session' : function () {
            event.preventDefault();
            var newSessionName = event.target.sessionName.value || 'unnamed session';
            Meteor.call('crateSession', newSessionName);
            event.target.sessionName.value = '';
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

    Meteor.publish(sessionsCollectionName, function () {
        return Sessions.find();
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
    },
    crateSession: function(sessionName) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Sessions.insert({
            Name: sessionName,
            Owner: Meteor.user(),
            Created: new Date()
        });
    }
});

Router.route('/', function () {
    this.layout('layout');
    this.render('homePage');
});

Router.route('/player', function () {
    this.layout('layout');
    this.render('playerPage');
});

Router.route('/master', function () {
    this.layout('layout');
    this.render('scrumMasterPage');
});