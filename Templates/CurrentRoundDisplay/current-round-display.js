if (Meteor.isClient) {
    Meteor.subscribe(roundsCollectionName);

    var getCurrentRound = function () {
        var sessionId = Session.get(selectedSession)._id;
        return Rounds.findOne({ SessionId: sessionId }, { sort: { Created: -1 } });
    };

    Template.currentRoundDisplay.helpers({
        getSelectedSession: function () {
            return Session.get(selectedSession);
        },
        currentRound: function () {
            var round = getCurrentRound();
            if (!round) {
                return undefined;
            }

            Session.set(currentRound, round);
            return round.Name;
        }
    });
}