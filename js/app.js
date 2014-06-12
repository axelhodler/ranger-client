var App = Ember.Application.create();

App.Router.map(function() {
  this.resource('medias', { path: '/' });
  this.resource('media', { path: ':media_id' });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('medias');
  }
});

App.MediasRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('media');
  }
});

App.MediaRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('media', params.media_id);
  }
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:1337'
});

App.Media = DS.Model.extend({
  _id: DS.attr('string'),
  url: DS.attr('string'),
  avgStartTime: DS.attr('number'),
  avgEndTime: DS.attr('number'),
  choicesByUsers: DS.attr('number')
});

// deal with the MongoDB ObjectId named "_id"
App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: "_id"
});
