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



function buildGraphs() {

  //START OF TWITTER SENSE CHART


    $.ajax({
    url: "http://safe-falls-84531.herokuapp.com/api/v1/searches/",
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

//END OF TWITTER SENSE CHART

// NPS SCORE AND RING CHART

          $.ajax({
            url: "https://evening-retreat-40915.herokuapp.com/api/surveys",
            // headers: {"Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU3YmJjODFiZjJhN2MwMWE1Y2JmOWYyMiIsImVtYWlsIjoiZ2VyYWxkQGcuY29tIiwiaWF0IjoxNDcxOTU0MTc3LCJleHAiOjE0NzE5NjQ5Nzd9.dZzFLd_oaEtgwVvCDpsrKGy-ryFfRg0wOc8FLV_bS5w"},
            type: "GET",
            datatype: 'json',
          }).done(function(result) {
            var $sample = $('#samplesize');
            var data = result.apiData;
            $sample.text("N = " + data[0].totalSurvey);
            var categoryRingChart   = dc.pieChart("#chart-ring-category"),
                npsRowChart = dc.rowChart("#chart-row-nps");
            var data1 = [
                {Name: data[0].Brand, npsScore: data[0].NPS_Score, category: "TECH",'total': 5},
                {Name: data[1].Brand, npsScore: data[1].NPS_Score, category:" FMCG",'total': 5},
                {Name: data[2].Brand, npsScore: data[2].NPS_Score, category: " FMCG",'total': 3},
                {Name: data[3].Brand, npsScore: data[3].NPS_Score, category: "TECH",'total': 5},
                {Name: data[4].Brand, npsScore: data[4].NPS_Score, category: " FMCG",'total': 5},
                {Name: data[5].Brand, npsScore: data[5].NPS_Score, category: "TECH",'total': 5},
                {Name: data[6].Brand, npsScore: data[6].NPS_Score, category: " TELCO",'total': 3},
                {Name: data[7].Brand, npsScore: data[7].NPS_Score, category: " TELCO",'total': 3},
                {Name: data[8].Brand, npsScore: data[8].NPS_Score, category: "ASS",'total': 2},
            ];
            // set crossfilter with first dataset
            var xfilter = crossfilter(data1),
                npsScoreDim = xfilter.dimension(function(d) {return Math.floor(+d.npsScore);}),
                nameDim  = xfilter.dimension(function(d) {return d.Name;}),
                categoryDim  = xfilter.dimension(function(d) {return d.category;}),

                npsScorePerCategory = categoryDim.group().reduceSum(function(d) {return +d.npsScore;}),
                npsScorePerName = nameDim.group().reduceSum(function(d) {return +d.npsScore;});
            function render_plots(){
                categoryRingChart
                    .width(160).height(160)
                    .dimension(categoryDim)
                    .group(npsScorePerCategory)
                    .ordinalColors(['#2B3D41', '#216869', '#56445D','#546A76'])
                    .innerRadius(40);
                npsRowChart
                    .width(450).height(490)
                    .dimension(nameDim)
                    .group(npsScorePerName)
                    .ordinalColors(['#414288','#414288','#414288','#414288','#414288','#414288','#414288','#414288','red'])
                    .elasticX(true);
                dc.renderAll();
            }

            render_plots();

            //START OF NPS REASON CHART
        var reasonRowChart   = dc.rowChart("#chart-row-reason");

        var data2 = [
              {Name: 'Product/Service Experience', share: parseFloat(data[0].NPS_Reason1)},
              {Name: 'Hearsay', share: parseFloat(data[1].NPS_Reason2)},
              {Name: 'Perception from Media', share: parseFloat(data[2].NPS_Reason3)}
                    ];

        var xfilter1 = crossfilter(data2),
            name1Dim  = xfilter1.dimension(function(d) {return d.Name;}),
            shareDim = xfilter1.dimension(function(d) {return Math.floor(+d.share);}),

            sharePerName = name1Dim.group().reduceSum(function(d) {return +d.share;});

            function render_plotsTwo(){
                reasonRowChart
                .width(450).height(170)
                .dimension(shareDim)
                .group(sharePerName)
                .ordinalColors(['#766C7F'])
                .elasticX(true);
                dc.renderAll();
                }

              render_plotsTwo();

  //END OF NPS REASON CHART
          });

  //END OF CATEGORY SCORE AND RING CHART

    });
}

buildGraphs();

setInterval(buildGraphs, 1000000);

var select = $('#dropdown');

select.on('change', function() {
  var selectedval = this.value;
  $.ajax({
    url: "https://evening-retreat-40915.herokuapp.com/api/surveys",
    // header: {"Authorization" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU3YmJjODFiZjJhN2MwMWE1Y2JmOWYyMiIsImVtYWlsIjoiZ2VyYWxkQGcuY29tIiwiaWF0IjoxNDcxOTU0MTc3LCJleHAiOjE0NzE5NjQ5Nzd9.dZzFLd_oaEtgwVvCDpsrKGy-ryFfRg0wOc8FLV_bS5w"},
    type: "GET",
    datatype: 'json',
  }).done(function(data) {
    for(var i = 0; i < 9; i++) {
      if(data.apiData[i].Brand === selectedval) {
        var reasonRowChart   = dc.rowChart("#chart-row-reason");

        var data2 = [
              {Name: 'Product/Service Experience', share: parseFloat(data.apiData[i].NPS_Reason1)},
              {Name: 'Hearsay', share: parseFloat(data.apiData[i].NPS_Reason2)},
              {Name: 'Perception from Media', share: parseFloat(data.apiData[i].NPS_Reason3)}
                    ];

        var xfilter1 = crossfilter(data2),
            name1Dim  = xfilter1.dimension(function(d) {return d.Name;}),
            shareDim = xfilter1.dimension(function(d) {return Math.floor(+d.share);}),

            sharePerName = name1Dim.group().reduceSum(function(d) {return +d.share;});

            function render_plotsTwo(){
                reasonRowChart
                .width(450).height(170)
                .dimension(shareDim)
                .group(sharePerName)
                .ordinalColors(['#766C7F'])
                .elasticX(true);
                dc.renderAll();
                }

              render_plotsTwo();
      }
    }
  });
});

});
