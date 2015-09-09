if (Meteor.isClient) {
    Meteor.subscribe(roundsCollectionName);

    var getCurrentRound = function () {
        var sessionId = Session.get(selectedSession)._id;
        return Rounds.findOne({ SessionId: sessionId }, { sort: { Created: -1 } });
    };

    Template.createRound.helpers({
        session: function () {
            return Session.get(selectedSession);
        },
        userIsSessionOwner: function () {
            return Session.get(selectedSession).Owner._id === Meteor.userId();
        },
        rounds: function () {
            var currentSession = Session.get(selectedSession);
            return Rounds.find({ SessionId: currentSession._id });
        }
    });

    Template.createRound.events({
        'submit .new-round': function (event) {
            event.preventDefault();

            var newRoundName = event.target.roundName.value || 'unnamed round';
            var currentSession = Session.get(selectedSession);
            var sessionId = currentSession._id;
            Meteor.call('createNewRound', sessionId, newRoundName);
            event.target.roundName.value = '';

            Session.set(currentRound, getCurrentRound())
        }
    });
}

Meteor.methods({
    createNewRound: function (sessionId, roundName) {
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