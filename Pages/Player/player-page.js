if (Meteor.isClient) {
    Template.cards.helpers({
        getSelectedSession: function () {
            return Session.get(selectedSession);
        }
    });
};