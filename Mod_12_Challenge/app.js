// Belly Button Biodiversity Dashboard

// Step 1: populate the drop down list

var selector = d3.select("#selDataset");

d3.json("samples.json").then((data) => {
  var names = data.names;
  console.log(data);
  names.forEach((name) => {
    selector.append("option")
      .text(name)
      .property("value", name)
  });

  var firstSampleID = names[0];

  makeBarChart(firstSampleID);
  makeBubbleChart(firstSampleID);
  makeGaugeChart(firstSampleID);
  makeMetadata(firstSampleID);

});

// Step 2: Create a bar chart for each sample ID listed
function makeBarChart(sampleID) {
  console.log('makeBarChart is called with the sample ID: ${sampleID}');

  d3.json('samples.json').then(function (data) {

    var samples = data.samples;
    var resultArray = samples.filter(sample => sample.id == sampleID);
    console.log(resultArray);
    var result = resultArray[0];
    console.log(result);

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    var yTicks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var barData = [
      {
        y: yTicks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"

      }
    ];
    var barLayout = { title: "Top 10 Bacteria Cultures Found" };
    Plotly.newPlot("bar", barData, barLayout);
  });
};

// Step 3: Create a bubble chart for each sample ID listed
function makeBubbleChart(sampleID) {
  console.log(`makeBubbleChart is called with the sample ID: ${sampleID}`);

  d3.json('samples.json').then(function (data) {
    var samples = data.samples;
    var resultArray = samples.filter(sample => sample.id == sampleID);
    var result = resultArray[0];
    var otu_ids = result.otu_ids;
    var sample_values = result.sample_values;
    var otu_labels = result.otu_labels;


    var bubbleChart = {
      title: "Bacteria Cultures Per Sample",
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
    };
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }];
    Plotly.newPlot("bubble", bubbleData, bubbleChart);
  });
};
// Step 4: Create a gauge chart for each sample ID listed
function makeGaugeChart(sampleID) {
  console.log(`makeGaugeChart is called with the sample ID: ${sampleID}`);

  d3.json('samples.json').then(function (data) {
    var samples = data.samples;
    var resultArray = samples.filter(sample => sample.id == sampleID);
    var result = resultArray[0];
    var otu_ids = result.otu_ids;
    var sample_values = result.sample_values;
    var otu_labels = result.otu_labels;
    var metadata = data.metadata;
    var metadata_results = metadata.find(metadataRecord => metadataRecord.id == sampleID);
    var wash_freq = metadata_results.wfreq;
    console.log(wash_freq);

    var gaugeChart = {
      title: "Belly Button Washing Frequency",
      xaxis: { title: "OTU ID" },
    };
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wash_freq,
        title: { text: "Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          bar: {color: "black"},
          axis: { range: [null, 10] },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "yellowgreen" },
            { range: [8, 10], color: "green" },
          ],
        },
      },
    ];

    var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', gaugeData, layout);
  });
};

// Step 5: Create a function for populating the metadata for each sample ID listed
function makeMetadata(sampleID) {
  console.log(`makeMetadata is called with the sample ID: ${sampleID}`);

  var PANEL = d3.select('#sample-metadata');

  PANEL.html('');


  d3.json('samples.json').then(function (data) {

    var metadata = data.metadata;
    console.log(metadata);

    var resultArray = metadata.filter(sample => sample.id == sampleID);
    console.log(resultArray);

    var result = resultArray[0];
    console.log(result);

    Object.entries(result).forEach(function ([key, value]) {

      PANEL.append("h6")
        .text(`${key.toUpperCase()}: ${value}`);

    });

  });

};

// Step 6: Create a signature of a function for handling the slector changes
function optionChanged(newSampleID) {
  makeBarChart(newSampleID);
  makeBubbleChart(newSampleID);
  makeGaugeChart(newSampleID);
  makeMetadata(newSampleID);
};