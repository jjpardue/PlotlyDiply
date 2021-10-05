function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      console.log(data);
      var names = data.names;
      sampleNames.forEach((name) => {
        selector
          .append("option")
          .text(name)
          .property("value", name);
      });
  })}; 

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }
  
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
    
      PANEL.html("");
      PANEL.append("h6").text("Location: " + result.location);
      PANEL.append("h6").text("Ethnicity: " + result.ethnicity);
      PANEL.append("h6").text("Gender: " + result.gender);
      PANEL.append("h6").text("Belly button type: " + result.bbtype);
      PANEL.append("h6").text("Frequency of washes per week: " + result.wfreq);
      });
  }
