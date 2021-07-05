// const url = "http://robdunnlab.com/projects/belly-button-biodiversity/";


var SubjectID = d3.select("#selDataset");
var DemoInfo = d3.select("#sample-metadata");
var barGraph = d3.select("#bar");
var gaugeGraph = d3.select("#gauge");
var bubleGraph = d3.select("#myDiv");

var importJSON = d3.json("samples.json");


// Creates the dropdown menu
importJSON.then((incomingData) => {
    var idsNames = incomingData.names;
    // <option value="">--Please choose an option--</option>
    idsNames.map(id => {
        SubjectID.append("option").text(id);
    })
})

// Creates the Demograpgic Info Panel 
function createDemoInfo(metadata) {
    DemoInfo.html("");

    for (const [key, value] of Object.entries(metadata)) {
        // console.log(`${key}: ${value}`);
        DemoInfo.append("p")
            .text(`${key}: ${value}`)
    }


};

// Creates the Defaul Demographic Info in the Panel
function createGraphs() {
    importJSON.then((incomingData) => {
        var idsNames = incomingData.names;
        var metadata = incomingData.metadata;
        var samples = incomingData.samples;

        var noID = parseInt(SubjectID.property('value'));

        var metadataDemoInfo = metadata.find((metadata) => metadata.id === noID);

        createDemoInfo(metadataDemoInfo)

        var samplesDemoInfo = samples.find((samples) => parseInt(samples.id) === noID);

        //Separtes the differnet info in differents array
        var sampleID = samplesDemoInfo.id;
        var sample_otu_ids = samplesDemoInfo.otu_ids;
        var sample_otu_lables = samplesDemoInfo.otu_labels;
        var sample_sample_values = samplesDemoInfo.sample_values;

        //Creates the Bar Chart

        var traceBar = {
            type: 'bar',
            orientation: 'h',
            x: sample_sample_values.slice(0, 10).reverse(),
            y: sample_otu_ids.slice(0, 10).map((OTU) => `OTU ${String(OTU)} `).reverse(),
            text: sample_otu_lables.slice(0, 10).slice(0, 10)
        };

        var layoutBar = {
            title: {
                text: `Top 10 Bacteria Cultures Found`
            },
            xaxis: {
                title: {
                    text: "Sample Values",
                    standoff: 15
                }
            }
        };

        Plotly.newPlot('bar', [traceBar], layoutBar);

        //Creates the Bubble Charts
        // Use otu_ids for the x values.
        // Use sample_values for the y values.
        // Use sample_values for the marker size.
        // Use otu_ids for the marker colors.
        // Use otu_labels for the text values.
        // To scale the bubble size, use the attribute sizeref. We recommend using the following formula to calculate a sizeref value:
        // sizeref = 2.0 * Math.max(...size) / (desired_maximum_marker_size**2)
        // Note that setting 'sizeref' to a value greater than 1, decreases the rendered marker sizes, while setting 'sizeref' to less than 1, increases the rendered marker sizes. See https://plotly.com/python/reference/scatter/#scatter-marker-sizeref for more information. Additionally, we recommend setting the sizemode attribute: https://plotly.com/python/reference/scatter/#scatter-marker-sizemode to area.

        var traceBubble = {
            x: sample_otu_ids,
            y: sample_sample_values,
            text: sample_otu_lables,
            mode: 'markers',
            marker: {
                size: sample_otu_ids,
                color: sample_otu_ids,
                sizemode: 'area'
            }
        };


        var data = [traceBubble];//, trace2, trace3, trace4];

        var layoutBuble = {
            title: 'Bacteria Cultures Per Sample',
            showlegend: false,
            xaxis: {
                title: `OTU ID: ${sampleID}`
            }


        };

        Plotly.newPlot('buble', data, layoutBuble);



        //Create the Gauge 
        var traceGauge = [
            {
                //   domain: { x: [0, 1], y: [0, 1] },
                value: metadataDemoInfo.wfreq,
                title: { text: "Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
   
                gauge: {
                    axis: { range: [0, 9] },
                    steps: [
                        { range: [0, 1], color: "#B0E0E6" },
                        { range: [1, 2], color: "#5F9EA0" },
                        { range: [2, 3], color: "#4682B4" },
                        { range: [3, 4], color: "#6495ED" },
                        { range: [4, 5], color: "#00BFFF" },
                        { range: [5, 6], color: "#ADD8E6" },
                        { range: [6, 7], color: "#1E90FF" },
                        { range: [7, 8], color: "#4169E1" },
                        { range: [8, 9], color: "#00008B" },

                    ],

                }
            }
        ];

        var layoutGauge = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', traceGauge, layoutGauge);



    });

};

//Calls the Function for the Default Values
createGraphs();

//Function for optionChanged
function optionChanged() {

    createGraphs();

};





