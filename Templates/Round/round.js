if (Meteor.isClient) {
    Meteor.subscribe(handsCollectionName);
    var showHide = new ReactiveVar(false);

    Template.round.helpers({
        show: function () {
            return showHide.get();
        },
        hands: function () {
            return Hands.find({ RoundId: this._id });
        },
        handCount: function () {
            return Hands.find({ RoundId: this._id }).fetch().length;
        },
        average: function () {
            var data = Hands.find({ RoundId: this._id }).fetch();
            var sum = _.chain(data).pluck('Value').reduce(function(memo, num) {
                return memo + num;
            }).value();

            return Math.round(sum / data.length);
        }
    });

    Template.round.events({
        'click .toggle': function () {
            showHide.set(!showHide.get());
        }
    });
}