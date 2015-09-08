if (Meteor.isClient) {
    Meteor.subscribe(cardsCollectionName);
    Meteor.subscribe(roundsCollectionName);

    Template.cards.helpers({
        cards: function () {
            return Cards.find();
        }
    });

    Template.cards.events({
        'click .card': function () {
            var value = $(event.target).data('value');
            var sessionId = Session.get(selectedSession)._id;
            var roundId = Session.get(currentRound)._id;
            Meteor.call('playHand', sessionId, roundId, value);
        }
    });
}

Meteor.methods({
    playHand: function (sessionId, roundId, value) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Hands.insert({
            SessionId: sessionId,
            RoundId: roundId,
            Player: Meteor.user(),
            Value: value
        });
    }
});