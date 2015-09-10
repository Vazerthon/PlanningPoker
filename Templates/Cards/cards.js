if (Meteor.isClient) {
    Meteor.subscribe(cardsCollectionName);
    Meteor.subscribe(roundsCollectionName);

    var getSessionId = function () {
        return Session.get(selectedSession)._id;
    };

    var getRoundId = function () {
        return Session.get(currentRound)._id;
    };

    var getMyHand = function () {
        var sessionId = getSessionId();
        var roundId = getRoundId();
        var me = Meteor.user();

        return Hands.findOne({ SessionId: sessionId, RoundId: roundId, PlayerId: me._id })
    };

    Template.cards.helpers({
        cards: function () {
            return Cards.find();
        },
        myHand: function () {
            return getMyHand();
        },
        handPlayed: function () {
            return getMyHand() != undefined;
        }
    });

    Template.cards.events({
        'click .playable-card': function (event) {
            if (getMyHand()) {
                return;
            }

            var sessionId = getSessionId();
            var roundId = getRoundId();
            var value = $(event.target).data('value');
            Meteor.call('playHand', sessionId, roundId, value);
        },
        'click .played-card': function (event) {
            if (!getMyHand()) {
                return;
            }

            Meteor.call('deleteHand', getMyHand());
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
            PlayerId: Meteor.userId(),
            Value: value
        });

    },
    deleteHand: function (hand) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Hands.remove(hand);
    }
});