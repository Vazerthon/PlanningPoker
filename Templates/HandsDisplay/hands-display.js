if (Meteor.isClient) {
    Meteor.subscribe(handsCollectionName);

    Template.handsDisplay.helpers({
        hands: function () {
            return Hands.find({ RoundId: this.toString() });
        }
    });
}