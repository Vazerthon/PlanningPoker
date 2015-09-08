if (Meteor.isClient) {
    Meteor.subscribe(handsCollectionName);

    Template.handsDisplay.helpers({
        hands: function () {
            console.log(Hands.find());
            return Hands.find({RoundId: this.toString()});
        }
    });
}