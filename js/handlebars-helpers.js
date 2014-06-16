Ember.Handlebars.helper('draw_range', function(currentMedia) {
  $('#range_diagram').css({"height":"75px"});
  var range_block = Raphael("range_diagram");
  // regular rectangle x,y,width,height,corner-rounded
  var mainPart = range_block.rect(0, 0, 500, 50, 10).attr("fill", "#0f0");

  var textStyle = { "font-weight": "bold", "font-size": 16,
              "font-family": "Arial, Helvetica, sans-serif" };

  var avgStartTime = currentMedia.get('avgStartTime');
  var avgEndTime = currentMedia.get('avgEndTime');

  var range_rect = range_block.rect(avgStartTime, 0, avgEndTime - avgStartTime,
                                    50, 0).attr("fill","#00f");

  // Rangestart Marker
  var startTime = range_block.rect(avgStartTime, 0, 5, 50, 2)
        .attr("fill", "#f00");
  var startText = range_block.text(avgStartTime, 50 + 10,
                                  format_time(avgStartTime));
  startText.attr(textStyle);

  // Rangeend Marker
  var endTime = range_block.rect(avgEndTime, 0, 5, 50, 2).attr("fill", "#f00");
  var endText = range_block.text(avgEndTime, 50 + 10, format_time(avgEndTime));
  endText.attr(textStyle);

  setStartDragging(range_block, startTime, startText, range_rect);
  setEndDragging(range_block, endTime, endText, range_rect);
});

Ember.Handlebars.helper('clear_range', function() {
  $('#range_diagram').html("").css({"height":"0px"});
});

Ember.Handlebars.helper('format_time', function(time) {
  return format_time(time);
});

function format_time(time) {
  var time_to_format = {
    minutes: 0,
    remaining_seconds: Math.round(time)
  };

  setMinutes(time_to_format);
  setRemainingSeconds(time_to_format);

  var formatted = formatTime(time_to_format);

  return formatted;
};

function setStartDragging(rangeBlock, timeMarker, timeText, range_rect) {
  var group = rangeBlock.set(timeMarker, timeText);
  group.data("myset", group);

  var onStart = function (currentX, currentY, e) {
    var myset = this.data("myset");
    myset.data("mytrans", this.transform());
  };

  var onMove = function (dx, dy) {
    var myset = this.data("myset");
    myset.transform(this.data("mytrans")+'T'+dx+','+0);
    timeText.attr("text", format_time(myset.getBBox().x));
    var mid_marker = (myset.getBBox().x + myset.getBBox().x2) / 2;
    var right_bound = range_rect.getBBox().x2;
    range_rect.attr("x", mid_marker);
    range_rect.attr("width", right_bound - mid_marker);
  };

  var onEnd = function () {
    var myset = this.data("myset");
    myset.data("mytrans", this.transform());
  };

  group.drag(onMove, onStart, onEnd);
};

function setEndDragging(rangeBlock, timeMarker, timeText, range_rect) {
  var group = rangeBlock.set(timeMarker, timeText);
  group.data("myset", group);

  var onStart = function (currentX, currentY, e) {
    var myset = this.data("myset");
    myset.data("mytrans", this.transform());
  };

  var onMove = function (dx, dy) {
    var myset = this.data("myset");
    myset.transform(this.data("mytrans")+'T'+dx+','+0);
    timeText.attr("text", format_time(myset.getBBox().x));
    var mid_marker = (myset.getBBox().x + myset.getBBox().x2) / 2;
    var left_bound = range_rect.getBBox().x;
    range_rect.attr("width", mid_marker - left_bound);
  };

  var onEnd = function () {
    var myset = this.data("myset");
    myset.data("mytrans", this.transform());
  };

  group.drag(onMove, onStart, onEnd);
};

// Helperfunctions
function setMinutes(time_to_format) {
  while (time_to_format.remaining_seconds > 59) {
    time_to_format.remaining_seconds -= 60;
    time_to_format.minutes++;
  }
}

function setRemainingSeconds(time_to_format) {
  if (time_to_format.remaining_seconds < 10) {
    time_to_format.remaining_seconds = '0' + time_to_format.remaining_seconds;
  }
}

function formatTime(time_to_format) {
  var formatted = time_to_format.minutes + ':'
        + time_to_format.remaining_seconds;
  return formatted;
}
