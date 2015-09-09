if (Meteor.isClient) {
    Template.handsDisplay.helpers({
        hands: function () {
            return this;
        }
    });
}