var App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true
});

Ember.Inflector.inflector.uncountable('media');

App.Router.map(function() {
  this.resource('media', { path: '/' });
  this.resource('medium', { path: ':medium_id' });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('media');
  }
});

App.MediaRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('media');
  }
});

App.MediumRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('content', model);
    controller.set('range', this.store.find('range', model.id));
  },
  model: function(params) {
    return this.store.find('media', params.medium_id);
  }
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:1337'
});

App.Media = DS.Model.extend({
  _id: DS.attr('string'),
  url: DS.attr('string')
});

App.Range = DS.Model.extend({
  _id: DS.attr('string'),
  startTime: DS.attr('number'),
  endTime: DS.attr('number')
});

// deal with the MongoDB ObjectId named "_id"
App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: "_id"
});
