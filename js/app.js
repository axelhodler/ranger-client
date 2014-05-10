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

Handlebars.registerHelper('rangeGfx', function() {
  // canvas at 50, 200  600*200
  var paper = Raphael(50, 200, 600, 200);

  // regular rectangle x,y,width,height,corner-rounded
  var mainPart = paper.rect(0, 0, 500, 50, 10);
  mainPart.attr("fill", "#0f0");

  var startTime = paper.rect(50, 0, 5, 50, 2);
  startTime.attr("fill", "#f00");

  var endTime = paper.rect(250, 0, 5, 50, 2);
  endTime.attr("fill", "#f00");
});
