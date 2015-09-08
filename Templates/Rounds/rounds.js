if (Meteor.isClient) {
    Meteor.subscribe(roundsCollectionName);

    var getCurrentRound = function () {
        var sessionId = Session.get(selectedSession)._id;
        return Rounds.findOne({ SessionId: sessionId }, { sort: { Created: -1 } });
    };

    Template.rounds.helpers({
        session: function () {
            return Session.get(selectedSession);
        },
        rounds: function () {
            var currentSession = Session.get(selectedSession);
            return Rounds.find({ SessionId: currentSession._id });
        }
    });
}