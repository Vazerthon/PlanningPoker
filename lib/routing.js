Router.route('/', function () {
    this.layout('layout');
    this.render('homePage');
});

Router.route('/player', function () {
    this.layout('layout');
    this.render('playerPage');
});

Router.route('/master', function () {
    this.layout('layout');
    this.render('scrumMasterPage');
});