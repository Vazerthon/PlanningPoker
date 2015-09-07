﻿if (Meteor.isClient) {
    Meteor.subscribe(sessionsCollectionName);

    Template.sessions.helpers({
        sessions: function () {
            return Sessions.find();
        },
        getSelectedSession: function () {
            return Session.get(selectedSession);
        }
    });

    Template.sessions.events({
        'submit .new-session' : function () {
            event.preventDefault();
            var newSessionName = event.target.sessionName.value || 'unnamed session';
            Meteor.call('createSession', newSessionName);
            event.target.sessionName.value = '';
        },
        'change #sessionPicker': function () {
            Session.set(selectedSession, Sessions.findOne(event.target.value));
        }
    });
}

Meteor.methods({
    createSession: function(sessionName) {
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