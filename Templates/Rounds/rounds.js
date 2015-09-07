if (Meteor.isClient) {
    Meteor.subscribe(roundsCollectionName);

    Template.rounds.helpers({
        session: function () {
            return Sessions.findOne(this.toString());
        },
        rounds: function () {
            return Rounds.find({ SessionId: this.toString() });
        }
    });

    Template.rounds.events({
        'submit .new-round': function () {
            event.preventDefault();

            var newRoundName = event.target.roundName.value || 'unnamed round';
            var sessionId = this.toString();
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
            Name: roundName
        });
    }
});