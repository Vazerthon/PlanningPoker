if (Meteor.isClient) {
    Meteor.subscribe(roundsCollectionName);

    Template.rounds.helpers({
        session: function () {
            return Session.get(selectedSession);
        },
        rounds: function () {
            var currentSession = Session.get(selectedSession);
            return Rounds.find({ SessionId: currentSession._id });
        }
    });

    Template.rounds.events({
        'submit .new-round': function () {
            event.preventDefault();

            var newRoundName = event.target.roundName.value || 'unnamed round';
            var currentSession = Session.get(selectedSession);
            var sessionId = currentSession._id;
            Meteor.call('createRound', sessionId, newRoundName);
            event.target.roundName.value = '';
        }
    });
}

Meteor.methods({
    createRound: function (sessionId, roundName) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Rounds.insert({
            SessionId: sessionId,
            Name: roundName,
            Created: new Date()
        });
    }
});