Ember.Handlebars.helper('draw_range', function(currentMedia) {
  $('#range_diagram').css({"heigth":"50px"});
  var range_block = Raphael("range_diagram");
  // regular rectangle x,y,width,height,corner-rounded
  var mainPart = range_block.rect(0, 0, 500, 50, 10);
  mainPart.attr("fill", "#0f0");

  var css = { "font-weight": "bold", "font-size": 16,
              "font-family": "Arial, Helvetica, sans-serif" };

  var avgStartTime = currentMedia.get('avgStartTime');
  var avgEndTime = currentMedia.get('avgEndTime');

  // Startstuff
  var startTime = range_block.rect(avgStartTime, 0, 5, 50, 2);
  startTime.attr("fill", "#f00");
  var startText = range_block.text(avgStartTime, 50 + 10,
                                  format_time(avgStartTime));
  startText.attr(css);

  // Endstuff
  var endTime = range_block.rect(avgEndTime, 0, 5, 50, 2);
  endTime.attr("fill", "#f00");
  var endText = range_block.text(avgEndTime, 50 + 10, format_time(avgEndTime));
  endText.attr(css);

  // startGroup draggin
  setDragging(range_block, startTime, startText);

  // endGroup dragging
  setDragging(range_block, endTime, endText);
});

Ember.Handlebars.helper('clear_range', function() {
  $('#range_diagram').html("").css({"height":"0px"});
});

Ember.Handlebars.helper('format_time', function(time) {
  return format_time(time);
});

function format_time(time) {
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
};

function setDragging(rangeBlock, timeMarker, timeText) {
  var group = rangeBlock.set(timeMarker, timeText);
  group.data("myset", group);

  var onStart = function (currentX, currentY, e) {
    var myset = this.data("myset");
    myset.data("mytrans", this.transform());
  }

  var onMove = function (dx, dy) {
    var myset = this.data("myset");
    myset.transform(this.data("mytrans")+'T'+dx+','+0);
    timeText.attr("text", format_time(myset.getBBox().x));
  }

  var onEnd = function () {
    var myset = this.data("myset");
    myset.data("mytrans", this.transform());
  }

  group.drag(onMove, onStart, onEnd);
};
