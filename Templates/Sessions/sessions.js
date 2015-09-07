'use strict'

var sessionsCollectionName = 'sessions';
var Sessions = new Mongo.Collection(sessionsCollectionName);

if (Meteor.isClient) {
    Meteor.subscribe(sessionsCollectionName);

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
    Meteor.publish(sessionsCollectionName, function () {
        return Sessions.find();
    });
}

Meteor.methods({
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