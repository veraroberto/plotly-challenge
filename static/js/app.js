// const url = "http://robdunnlab.com/projects/belly-button-biodiversity/";


var SubjectID = d3.select("#selDataset");
var DemoInfo = d3.select("#sample-metadata");
var barGraph = d3.select("#bar");
var gaugeGraph = d3.select("#gauge");
var bubleGraph = d3.select("#bubble");

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

function sortSamples(a, b) {
    return a.sample_sample_values - b.sample_sample_values;
}

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
        console.log(typeof samplesDemoInfo);

        //Separtes the differnet info in differents array
        var sampleID = samplesDemoInfo.id;
        var sample_otu_ids = samplesDemoInfo.otu_ids;
        var sample_otu_lables = samplesDemoInfo.otu_labels;
        var sample_sample_values = samplesDemoInfo.sample_values;


        var trace = {
            type: 'bar',
            orientation: 'h',
            x: sample_sample_values.slice(0, 10).reverse(),
            y: sample_otu_ids.slice(0, 10).map((OTU) => `OTU ${String(OTU)} `).reverse(),
            text: sample_otu_lables.slice(0, 10).slice(0, 10)
        };

        var layout = {
            title: {
                text: `Top 10 Bacteria Cultures Found in ID No.: ${sampleID}`
            },
            xaxis: {
                title: {
                    text: "Sample Values",
                    standoff: 15
                }
            }
        };

        Plotly.newPlot('bar', [trace], layout);


    });

};

//Calls the Function for the Default Values
createGraphs();

//Function for optionChanged
function optionChanged() {

    createGraphs();

};





