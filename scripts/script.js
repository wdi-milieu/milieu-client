$(function() {

  $("#brandname").fadeIn(4000);

  $("#arrow").click(function() {
    console.log("clicked");
    $('html,body').animate({
        scrollTop: $("#title").offset().top},
        'slow');
});

// NPS SCORE AND RING CHART
var categoryRingChart   = dc.pieChart("#chart-ring-category"),
    npsRowChart = dc.rowChart("#chart-row-nps");
var connectionone = new WebSocket('ws://localhost:8001/websocket/1');
var data1 = [
    {Name: 'Apple', npsScore: 20, category: "Tech", 'total':1},
    {Name: 'Samsung', npsScore: 10, category:"Tech", 'total':1},
    {Name: 'Breadtalk', npsScore: 8, category: "Food", 'total':1},
    {Name: 'Singtel', npsScore: 6, category: "Telecom", 'total':1},
    {Name: 'Starhub', npsScore: 12, category: "Telecom", 'total':1},
    {Name: 'Google', npsScore: 32, category: "Tech", 'total':1},
    {Name: 'NTUC', npsScore: 10, category: "FMCG", 'total':1},
    {Name: 'Giant', npsScore: 16, category: "FMCG", 'total':1},
    {Name: 'Trump', npsScore: -10, category: "Idiot", 'total':1},
];
// set crossfilter with first dataset
var xfilter = crossfilter(data1),
    categoryDim  = xfilter.dimension(function(d) {return d.category;}),
    npsScoreDim = xfilter.dimension(function(d) {return Math.floor(d.npsScore);}),
    nameDim  = xfilter.dimension(function(d) {return d.Name;}),

    npsScorePerCategory = categoryDim.group().reduceSum(function(d) {return +d.npsScore;}),
    npsScorePerName = nameDim.group().reduceSum(function(d) {return +d.npsScore;});
function render_plots(){
    categoryRingChart
        .width(220).height(220)
        .dimension(categoryDim)
        .group(npsScorePerCategory)
        .innerRadius(50);
    npsRowChart
        .width(450).height(530)
        .dimension(nameDim)
        .group(npsScorePerName)
        .elasticX(true);
    dc.renderAll();
}
render_plots();
// data reset function (adapted)
function resetData(ndx, dimensions) {
    var categoryChartFilters = categoryRingChart.filters();
    var npsChartFilters = npsRowChart.filters();
    categoryRingChart.filter(null);
    npsRowChart.filter(null);
    xfilter.remove();
    categoryRingChart.filter([categoryChartFilters]);
    npsRowChart.filter([npsChartFilters]);
}
connectionone.onmessage = function(event) {
    var newData = JSON.parse(event.data);
    var updateObject =[{
        "Name": newData.Name,
        "npsScore": newData.npsScore,
    }];
    //resetData(ndx, [yearDim, spendDim, nameDim]);
    xfilter.add(updateObject);
    dc.redrawAll();
};

//END OF CATEGORY SCORE AND RING CHART

//START OF NPS REASON CHART

var reasonRowChart   = dc.rowChart("#chart-row-reason");
var connectiontwo = new WebSocket('ws://localhost:8001/websocket/2');

var data2 = [
    {Name: 'Product/Service Experience', share: 40},
    {Name: 'Hearsay', share: 25},
    {Name: 'Perception from Media', share: 35}
];

var xfilter1 = crossfilter(data2),
    name1Dim  = xfilter1.dimension(function(d) {return d.Name;}),
    shareDim = xfilter1.dimension(function(d) {return Math.floor(+d.share);}),

    sharePerName = name1Dim.group().reduceSum(function(d) {return +d.share;});

    function render_plotsTwo(){
        reasonRowChart
            .width(400).height(200)
            .dimension(shareDim)
            .group(sharePerName)
            .elasticX(true);
        dc.renderAll();
    }

    render_plotsTwo();

    // data reset function (adapted)
    function resetData2(ndx, dimensions) {
        var reasonChartFilters = reasonRowChart.filters();
        reasonRowChart.filter(null);
        xfilter.remove();
        reasonRowChart.filter([reasonFilters]);
    }
    connectionone.onmessage = function(event) {
        var newData = JSON.parse(event.data);
        var updateObject =[{
            "Name": newData.Name,
            "npsScore": newData.share,
        }];
        //resetData(ndx, [yearDim, spendDim, nameDim]);
        xfilter.add(updateObject);
        dc.redrawAll();
    };

    //END OF NPS REASON CHART

    //START OF TWITTER SENSE CHART
var $twitterbutton = $('#twitterbutton');

$twitterbutton.on('click', function(e) {
  e.preventDefault();
  $.ajax({
  url: "http://safe-falls-84531.herokuapp.com/api/v1/searches/",
  type: 'GET',
  datatype: 'json'
  }).done(function(data) {
    console.log(data.items[0].negativity);
    var twitterposRowChart   = dc.rowChart("#chart-row-twitterpos");
    var twitternegRowChart   = dc.rowChart("#chart-row-twitterneg");
    var connectionthree = new WebSocket('ws://localhost:8001/websocket/3');

    var data3 = [
        {negativity: data.items[0].negativity, positivity: data.items[0].positivity, search_term: "#apple"},
        {negativity: data.items[1].negativity, positivity: data.items[1].positivity, search_term: "#samsung"},
        {negativity: data.items[2].negativity, positivity: data.items[2].positivity, search_term: "#breadtalk"},
        {negativity: data.items[3].negativity, positivity: data.items[3].positivity, search_term: "#singtel"},
        {negativity: data.items[4].negativity, positivity: data.items[4].positivity, search_term: "#starhub"},
        {negativity: data.items[5].negativity, positivity: data.items[5].positivity, search_term: "#google"},
        {negativity: data.items[6].negativity, positivity: data.items[6].positivity, search_term: "#NTUC"},
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
                .width(400).height(260)
                .dimension(positivityDim)
                .group(positivityPerSearch_term)
                .elasticX(true);
            twitternegRowChart
                .width(400).height(260)
                .dimension(negativityDim)
                .group(negativityPerSearch_term)
                .elasticX(true);
            dc.renderAll();
        }

        render_plotsThree();

        // data reset function (adapted)
        function resetData3(ndx, dimensions) {
            var twitterposChartFilters = twitterposRowChart.filters();
            var twitternegChartFilters = twitternegRowChart.filters();
            twitterposRowChart.filter(null);
            twitternegRowChart.filter(null);
            xfilter.remove();
            twitterposRowChart.filter([twitterposFilters]);
            twitternegRowChart.filter([twitternegFilters]);
        }
        connectionone.onmessage = function(event) {
            var newData = JSON.parse(event.data);
            var updateObject =[{
                "Name": newData.Name,
                "npsScore": newData.share,
            }];
            //resetData(ndx, [yearDim, spendDim, nameDim]);
            xfilter.add(updateObject);
            dc.redrawAll();
        };

  });

});




    //END OF TWITTER SENSE CHART
});
