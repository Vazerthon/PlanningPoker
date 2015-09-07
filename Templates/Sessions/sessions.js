if (Meteor.isClient) {
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
        'change #sessionPicker': function () {
            Session.set(selectedSession, Sessions.findOne(event.target.value));
        }
    });
}