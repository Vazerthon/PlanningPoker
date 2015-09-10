if (Meteor.isClient) {
    Meteor.subscribe(sessionsCollectionName);
    Meteor.subscribe(roundsCollectionName);

    var getCurrentRound = function () {
        var sessionId = Session.get(selectedSession)._id;
        return Rounds.findOne({ SessionId: sessionId }, { sort: { Created: -1 } });
    };

    Template.sessions.helpers({
        sessions: function () {
            return Sessions.find();
        }
    });

    Template.sessions.events({
        'change #sessionPicker': function (event) {
            Session.set(selectedSession, Sessions.findOne(event.target.value));
            Session.set(currentRound, getCurrentRound())
        }
    });
}