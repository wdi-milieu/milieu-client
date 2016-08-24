$(function() {

  $("#brandname").fadeIn(4000);

  $("#arrow").click(function() {
    console.log("clicked");
    $('html,body').animate({
        scrollTop: $("#title").offset().top},
        'slow');
});

var reload = $('#reload');

reload.on('click', function() {
  location.reload();
});


$.ajax({
url: "https://evening-retreat-40915.herokuapp.com/api/survey2",
type: 'GET',
datatype: 'json'
}).done(function(data) {
  var twitterposRowChart   = dc.rowChart("#chart-row-twitterpos");
  var twitternegRowChart   = dc.rowChart("#chart-row-twitterneg");

  var data3 = [
      {negativity: data.items[0].negativity, positivity: data.items[0].positivity, search_term: "#apple"},
      {negativity: data.items[1].negativity, positivity: data.items[1].positivity, search_term: "#samsung"},
      {negativity: data.items[2].negativity, positivity: data.items[2].positivity, search_term: "#breadtalk"},
      {negativity: data.items[3].negativity, positivity: data.items[3].positivity, search_term: "#singtel"},
      {negativity: data.items[4].negativity, positivity: data.items[4].positivity, search_term: "#starhub"},
      {negativity: data.items[5].negativity, positivity: data.items[5].positivity, search_term: "#google"},
      {negativity: data.items[6].negativity, positivity: data.items[6].positivity, search_term: "#ntuc"},
      {negativity: data.items[7].negativity, positivity: data.items[7].positivity, search_term: "#giant"},
      {negativity: data.items[8].negativity, positivity: data.items[8].positivity, search_term: "#trump"},
  ];

  var xfilter2 = crossfilter(data3),
      search_termDim  = xfilter2.dimension(function(d) {return d.search_term;}),
      positivityDim = xfilter2.dimension(function(d) {return Math.floor(+d.positivity);}),
      negativityDim = xfilter2.dimension(function(d) {return Math.floor(+d.negativity);}),

      positivityPerSearch_term = search_termDim.group().reduceSum(function(d) {return +d.positivity;});
      negativityPerSearch_term = search_termDim.group().reduceSum(function(d) {return +d.negativity;});

      function render_plotsThree(){
          twitterposRowChart
              .width(400).height(250)
              .dimension(positivityDim)
              .group(positivityPerSearch_term)
              .ordinalColors(['#28666E'])
              .elasticX(true);
          twitternegRowChart
              .width(400).height(250)
              .dimension(negativityDim)
              .group(negativityPerSearch_term)
              .ordinalColors(['#8C271E'])
              .elasticX(true);
          dc.renderAll();
      }
      render_plotsThree();
});

});
