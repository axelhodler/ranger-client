var App = Ember.Application.create();

App.Router.map(function() {
  this.resource('medias', { path: '/' });
  this.resource('media', { path: ':media_id' });
});

App.ApplicationAdapter = DS.FixtureAdapter;

App.MediasRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('medias');
  }
});

App.MediaRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('medias', params.media_id);
  }
});

App.Medias = DS.Model.extend({
  url: DS.attr('string'),
  avgStartTime: DS.attr('number'),
  avgEndTime: DS.attr('number')
});

App.Medias.FIXTURES = [
  {
    id: 1,
    url: 'www.google.com',
    avgStartTime: 50.5,
    avgEndTime: 300.3
  },
  {
    id: 2,
    url: 'www.yahoo.com',
    avgStartTime: 70.5,
    avgEndTime: 120.7
  }
];

Ember.Handlebars.helper('draw_range', function(currentMedia) {
  // canvas at 50, 200  600*200
  var paper = Raphael(50, 200, 600, 200);

  // regular rectangle x,y,width,height,corner-rounded
  var mainPart = paper.rect(0, 0, 500, 50, 10);
  mainPart.attr("fill", "#0f0");

  var startTime = paper.rect(currentMedia.get('avgStartTime'), 0, 5, 50, 2);
  startTime.attr("fill", "#f00");

  var endTime = paper.rect(currentMedia.get('avgEndTime'), 0, 5, 50, 2);
  endTime.attr("fill", "#f00");

  var startText = paper.text(currentMedia.get('avgStartTime'), 50 + 10, "Start");
  var endText = paper.text(currentMedia.get('avgEndTime'), 50 + 10, "End");

  var css = { "font-weight": "bold", "font-size": 16,
              "font-family": "Arial, Helvetica, sans-serif" };
  startText.attr(css);
  endText.attr(css);

});

Ember.Handlebars.helper('format_time', function(time) {
  var rounded = Math.round(time);
  var min = 0;
  var secs = 0;

  while (rounded > 59) {
    rounded -= 60;
    min++;
  }

  if (rounded < 10) {
    secs = '0' + rounded;
  } else {
    secs = rounded;
  }

  var formatted = min + ':' + secs;

  return formatted;
});
