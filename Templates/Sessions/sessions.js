if (Meteor.isClient) {
    Meteor.subscribe(sessionsCollectionName);
    Meteor.subscribe(roundsCollectionName);

    var getCurrentRound = function() {
        var sessionId = Session.get(selectedSession)._id;
        return Rounds.findOne({ SessionId: sessionId }, { sort: { Created: -1 } });
    };

    Template.sessions.helpers({
        sessions: function () {
            return Sessions.find();
        },
        getSelectedSession: function () {
            return Session.get(selectedSession);
        },
        currentRound: function () {
            var round = getCurrentRound();
            return round ? round.Name : undefined;
        }
    });

    Template.sessions.events({
        'change #sessionPicker': function () {
            Session.set(selectedSession, Sessions.findOne(event.target.value));
            Session.set(currentRound, getCurrentRound())
        }
    });
}