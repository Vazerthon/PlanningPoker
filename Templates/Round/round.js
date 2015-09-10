if (Meteor.isClient) {
    Meteor.subscribe(handsCollectionName);
    Meteor.subscribe(roundsCollectionName);

    var showHide = new ReactiveVar(false);

    var getCurrentRound = function () {
        var sessionId = Session.get(selectedSession)._id;
        return Rounds.findOne({ SessionId: sessionId }, { sort: { Created: -1 } });
    };

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
            var sum = _.chain(data).pluck('Value').reduce(function (memo, num) {
                return memo + num;
            }).value();

            return Math.round(sum / data.length);
        },
        currentRoundRowClass: function () {
            if (this._id === getCurrentRound()._id) {
                return 'current-round';
            } else {
                return '';
            }
        }
    });

    Template.round.events({
        'click .toggle': function () {
            showHide.set(!showHide.get());
        }
    });
}