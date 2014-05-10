var App = Ember.Application.create();

App.Router.map(function() {
  this.resource('medias', { path: '/' });
});

App.ApplicationAdapter = DS.FixtureAdapter;

App.MediasRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('medias');
  }
});

App.Medias = DS.Model.extend({
  url: DS.attr( 'string' )
});

App.Medias.FIXTURES = [
  { id: 1, url: 'www.google.com'},
  { id: 2, url: 'www.yahoo.com'}
];
