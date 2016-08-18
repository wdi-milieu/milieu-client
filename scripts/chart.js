var data = [{brand: "Nike", rating: 8},
            {brand: "Adidas", rating: 9},
            {brand: "Reebok", rating: 7},
            {brand: "New Balance", rating: 5.1},
            {brand: "Li Ning", rating: 5.5},
            {brand: "Puma", rating: 6},
            {brand: "Under Armour", rating: 7},
            {brand: "Mikasa", rating: 7},
            {brand: "Mizuno", rating: 7},
            {brand: "Lotto", rating: 10},
            {brand: "Nike", rating: 8},
            {brand: "Adidas", rating: 9},
            {brand: "Reebok", rating: 7},
            {brand: "New Balance", rating: 5.1},
            {brand: "Li Ning", rating: 5.5},
            {brand: "Puma", rating: 6},
            {brand: "Under Armour", rating: 1},
            {brand: "Mikasa", rating: 7},
            {brand: "Mizuno", rating: 7},
            {brand: "Junius", rating: 0.1}
          ];

var barWidth = 40;
var width = (barWidth + 10) * data.length;
var height = 300;

//domain -> set how many bars, range sets where does the bar chart starts and ends
var x = d3.scale.linear().domain([0, data.length]).range([0, width]);
var y = d3.scale.linear().domain([0, d3.max(data, function(datum) { return datum.rating; })]).
  rangeRound([0, height]);

$('<h3>Horizontal Brand Chart</h3>').appendTo($('#hBarChart'));

var hWidth = 800;
var hBarHeight = 20;

//Creating the canvas
// https://github.com/d3/d3/blob/master/API.md#selections-d3-selection
var hChart = d3.select("#hBarChart").
  append("svg").
  attr("width", hWidth).
  attr("height", hBarHeight * data.length);

//Creating the bars
hChart.selectAll("rect").
  data(data).
  enter().
  append("rect").
  attr("x", 150).
  attr("width", function(datum) { return x(datum.rating); }).
  attr("height", hBarHeight - 3).
  attr("rx", 5).
  attr("fill", "orange").
  attr("transform", function(datum, index) { return "translate(0," + index * hBarHeight + ")"; });

hChart.selectAll("text").
  data(data).
  enter().
  append("text").
  attr("x", function(datum) { return x(datum.rating) +130; }).
  attr("y", hBarHeight/2 - 1).
  attr("dy", ".35em").
  text(function(datum) {return datum.rating; }).
  attr("style", "font-size: 0.8em; font-family: Helvetica, sans-serif").
  attr("fill", "white").
  attr("transform", function(datum, index) { return "translate(0," + index * hBarHeight + ")"; });

hChart.selectAll("text.yAxis").
  data(data).
  enter().
  append("text").
  attr("x", 140).
  attr("y", hBarHeight/2 + 3).
  text(function(datum) { return datum.brand; } ).
  attr("style", "font-size: 0.8em; font-family: Helvetica, sans-serif").
  attr("text-anchor", "end").
  attr("transform", function(datum, index) { return "translate(0," + index * hBarHeight + ")"; });
//
// hChart.selectAll("text.xAxis").
//   data(data).
//   enter().
//   append("text").
