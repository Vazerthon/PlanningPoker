if (Meteor.isClient) {
    Meteor.subscribe(cardsCollectionName);

    Template.cards.helpers({
        cards: function () {
            return Cards.find();
        }
    });
}