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
url: "https://evening-retreat-40915.herokuapp.com/api/wdi4survey",
type: 'GET',
datatype: 'json'
}).done(function(data) {
  var wdi4oneRowChart   = dc.rowChart("#chart-row-wdi4one");

  var dataset = [
      {option: data.q1opt1, question: "PRIMA"},
      {option: data.q1opt2, question: "RANDOM GUY"},
  ];

  var xfilter = crossfilter(dataset),
      questionDim  = xfilter.dimension(function(d) {return d.question;}),
      optionDim = xfilter.dimension(function(d) {return Math.floor(+d.option);});

  optionPerQuestion = questionDim.group().reduceSum(function(d) {return +d.option;});

      function render_plots(){
          wdi4oneRowChart
              .width(320).height(180)
              .dimension(questionDim)
              .group(optionPerQuestion)
              .ordinalColors(['#FF8C42'])
              .elasticX(true);
          dc.renderAll();
      }
      render_plots();

      var wdi4twoRowChart   = dc.rowChart("#chart-row-wdi4two");

      var datasettwo = [
          {option: data.q2opt1, question: "YUZHENG"},
          {option: data.q2opt2, question: "ZHEZHANG"},
          {option: data.q2opt3, question: "MING"},
      ];

      var xfiltertwo = crossfilter(datasettwo),
          questionDimtwo  = xfiltertwo.dimension(function(d) {return d.question;}),
          optionDimtwo = xfiltertwo.dimension(function(d) {return Math.floor(+d.option);});

      optionPerQuestiontwo = questionDimtwo.group().reduceSum(function(d) {return +d.option;});

          function render_plotstwo(){
              wdi4twoRowChart
                  .width(320).height(180)
                  .dimension(questionDimtwo)
                  .group(optionPerQuestiontwo)
                  .ordinalColors(['#FF8C42'])
                  .elasticX(true);
              dc.renderAll();
          }
          render_plotstwo();

          var wdi4threeRowChart   = dc.rowChart("#chart-row-wdi4three");

          var datasetthree = [
              {option: data.q3opt1, question: "NICHOLAS"},
              {option: data.q3opt2, question: "KAI"},
              {option: data.q3opt3, question: "DYLAN"},
          ];

          var xfilterthree = crossfilter(datasetthree),
              questionDimthree  = xfilterthree.dimension(function(d) {return d.question;}),
              optionDimthree = xfilterthree.dimension(function(d) {return Math.floor(+d.option);});

          optionPerQuestionthree = questionDimthree.group().reduceSum(function(d) {return +d.option;});

              function render_plotsthree(){
                  wdi4threeRowChart
                      .width(320).height(180)
                      .dimension(questionDimthree)
                      .group(optionPerQuestionthree)
                      .ordinalColors(['#FF8C42'])
                      .elasticX(true);
                  dc.renderAll();
              }
              render_plotsthree();

              var wdi4fourRowChart   = dc.rowChart("#chart-row-wdi4four");

              var datasetfour = [
                  {option: data.q4opt1, question: "LUQMAN"},
                  {option: data.q4opt2, question: "ZHEZHANG"},
                  {option: data.q4opt3, question: "SABRINA"},
              ];

              var xfilterfour = crossfilter(datasetfour),
                  questionDimfour  = xfilterfour.dimension(function(d) {return d.question;}),
                  optionDimfour = xfilterfour.dimension(function(d) {return Math.floor(+d.option);});

              optionPerQuestionfour = questionDimfour.group().reduceSum(function(d) {return +d.option;});

                  function render_plotsfour(){
                      wdi4fourRowChart
                          .width(320).height(180)
                          .dimension(questionDimfour)
                          .group(optionPerQuestionfour)
                          .ordinalColors(['#FF8C42'])
                          .elasticX(true);
                      dc.renderAll();
                  }
                  render_plotsfour();

                  var wdi4fiveRowChart   = dc.rowChart("#chart-row-wdi4five");

                  var datasetfive = [
                      {option: data.q5opt1, question: "ANNEXE 3"},
                      {option: data.q5opt2, question: "BOMBSHELTER"},
                  ];

                  var xfilterfive = crossfilter(datasetfive),
                      questionDimfive  = xfilterfive.dimension(function(d) {return d.question;}),
                      optionDimfive = xfilterfive.dimension(function(d) {return Math.floor(+d.option);});

                  optionPerQuestionfive = questionDimfive.group().reduceSum(function(d) {return +d.option;});

                      function render_plotsfive(){
                          wdi4fiveRowChart
                              .width(320).height(180)
                              .dimension(questionDimfive)
                              .group(optionPerQuestionfive)
                              .ordinalColors(['#FF8C42'])
                              .elasticX(true);
                          dc.renderAll();
                      }
                      render_plotsfive();

                      var wdi4sixRowChart   = dc.rowChart("#chart-row-wdi4six");

                      var datasetsix = [
                          {option: data.q6opt1, question: "BARNEY"},
                          {option: data.q6opt2, question: "CURIAN"},
                          {option: data.q6opt3, question: "EDISON"},
                          {option: data.q6opt3, question: "VERON"},
                      ];

                      var xfiltersix = crossfilter(datasetsix),
                          questionDimsix  = xfiltersix.dimension(function(d) {return d.question;}),
                          optionDimsix = xfiltersix.dimension(function(d) {return Math.floor(+d.option);});

                      optionPerQuestionsix = questionDimsix.group().reduceSum(function(d) {return +d.option;});

                          function render_plotssix(){
                              wdi4sixRowChart
                                  .width(320).height(180)
                                  .dimension(questionDimsix)
                                  .group(optionPerQuestionsix)
                                  .ordinalColors(['#FF8C42'])
                                  .elasticX(true);
                              dc.renderAll();
                          }
                          render_plotssix();
});

});
