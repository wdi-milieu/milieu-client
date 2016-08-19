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
var chartCanvas = d3.select("#barChart").
  append("svg").
  attr("width", canvasWidth + barMarginLeft + 30).
  attr("height", barHeight * ( data.length + 2 ));

//Creating the bars
chartCanvas.selectAll("rect").
  data(data).
  enter().
  append("rect").
  attr("x", barMarginLeft).
  attr("y", function(d, i)  { return i * barHeight; }).
  attr("width", function(d) { return widthScale(d.rating); }).
  attr("height", barHeight - 3).
  attr("rx", 5).
  attr("fill", "#005aff");

chartCanvas.selectAll("text").
  data(data).
  enter().
  append("text").
  attr("x", barMarginLeft + 10).
  attr("y", function(d, i)  { return (i * barHeight) + barHeight/2; }).
  attr("dy", ".35em").
  text(function(d) {return d.rating; }).
  attr("style", "font-size: 0.8em; font-family: Helvetica, sans-serif").
  attr("fill", "white");

chartCanvas.selectAll("text.yAxis").
  data(data).
  enter().
  append("text").
  attr("x", barMarginLeft - 10).
  attr("y", function(d, i)  { return (i * barHeight) + barHeight/1.5; }).
  text(function(d) { return d.brand; } ).
  attr("style", "font-size: 0.8em; font-family: Helvetica, sans-serif").
  attr("text-anchor", "end");

chartCanvas.append("g").
  attr("transform", "translate(" + barMarginLeft + "," + (barHeight * data.length) + ")").
  attr("style", "font-size: 0.8em; font-family: Helvetica, sans-serif").
  attr("fill", "#89b3ff").
  call(axis);
