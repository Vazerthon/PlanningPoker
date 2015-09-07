if (Meteor.isClient) {
    Meteor.subscribe(sessionsCollectionName);

    Template.createSession.events({
        'submit .new-session' : function () {
            event.preventDefault();
            var newSessionName = event.target.sessionName.value || 'unnamed session';
            Meteor.call('createSession', newSessionName);
            event.target.sessionName.value = '';
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