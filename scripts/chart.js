var data = [{brand: "Apple", rating: 8.9},
            {brand: "Samsung", rating: 9},
            {brand: "Breadtalk", rating: 7},
            {brand: "Singtel", rating: 3},
            {brand: "Starhub", rating: 3},
            {brand: "Google", rating: 8.8},
            {brand: "NTUC", rating: 7},
            {brand: "Giant", rating: 7},
            {brand: "Trump", rating: 1}
          ];

var canvasWidth = 500;
var barHeight = 20;
var maxRating = 10;
var barMarginLeft = 150;

//domain -> set how many bars, range sets where does the bar chart starts and ends
var widthScale = d3.scale.linear().domain([0, maxRating]).range([0, canvasWidth]);

var axis = d3.svg.axis().scale(widthScale);

//Creating the canvas
// https://github.com/d3/d3/blob/master/API.md#selections-d3-selection
var Chart = d3.select("#barChart").
  append("svg").
  attr("width", canvasWidth + barMarginLeft + 30).
  attr("height", barHeight * ( data.length + 2 ));

//Creating the bars
Chart.selectAll("rect").
  data(data).
  enter().
  append("rect").
  attr("x", barMarginLeft).
  attr("width", function(d) { return widthScale(d.rating); }).
  attr("height", barHeight - 3).
  attr("rx", 5).
  attr("fill", "#005aff").
  attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

Chart.selectAll("text").
  data(data).
  enter().
  append("text").
  attr("x", barMarginLeft + 10).
  attr("y", barHeight/2 - 1).
  attr("dy", ".35em").
  text(function(d) {return d.rating; }).
  attr("style", "font-size: 0.8em; font-family: Helvetica, sans-serif").
  attr("fill", "white").
  attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

Chart.selectAll("text.yAxis").
  data(data).
  enter().
  append("text").
  attr("x", barMarginLeft - 10).
  attr("y", barHeight/2 + 3).
  text(function(d) { return d.brand; } ).
  attr("style", "font-size: 0.8em; font-family: Helvetica, sans-serif").
  attr("text-anchor", "end").
  attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

Chart.append("g").
  attr("transform", "translate(" + barMarginLeft + "," + (barHeight * data.length) + ")").
  attr("style", "font-size: 0.8em; font-family: Helvetica, sans-serif").
  attr("fill", "#89b3ff").
  call(axis);

  // var y = d3.scale.linear().domain([0, d3.max(data, function(d) { return d.rating; })]).rangeRound([0, barHeight]);

//
// hChart.selectAll("text.xAxis").
//   data(data).
//   enter().
//   append("text").
