roundsCollectionName = 'rounds';
cardsCollectionName = 'cards';
sessionsCollectionName = 'sessions';
handsCollectionName = 'hands';

Rounds = new Mongo.Collection(roundsCollectionName);
Cards = new Mongo.Collection(cardsCollectionName);
Sessions = new Mongo.Collection(sessionsCollectionName);
Hands = new Mongo.Collection(handsCollectionName);

selectedSession = 'selectedSession';

if (Meteor.isServer) {
    Meteor.publish(roundsCollectionName, function () {
        return Rounds.find();
    });

    Meteor.publish(sessionsCollectionName, function () {
        return Sessions.find();
    });

    Meteor.publish(cardsCollectionName, function () {
        return Cards.find();
    });

    Meteor.startup(function () {
        Meteor.call('seedCards')
    });
}

Meteor.methods({
    seedCards: function () {
        var allCards = Cards.find().fetch();

        allCards.forEach(function (card) {
            Cards.remove(card);
        });

        Cards.insert({ Label: "1", Value: 1 })
        Cards.insert({ Label: "2", Value: 2 })
        Cards.insert({ Label: "3", Value: 3 })
        Cards.insert({ Label: "5", Value: 5 })
        Cards.insert({ Label: "8", Value: 8 })
        Cards.insert({ Label: "13", Value: 13 })
        Cards.insert({ Label: "20", Value: 20 })
        Cards.insert({ Label: "40", Value: 40 })
        Cards.insert({ Label: "100", Value: 100 })
        Cards.insert({ Label: "∞", Value: 0 })
        Cards.insert({ Label: "?", Value: 0 })
    }
});