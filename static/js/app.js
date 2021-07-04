// const url = "http://robdunnlab.com/projects/belly-button-biodiversity/";


var SubjectID = d3.selectAll("#selDataset");
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

// Creates the Demograpgic Info
function createDemoInfo(metadata) {
    DemoInfo.html("");

    for (const [key, value] of Object.entries(metadata)) {
        // console.log(`${key}: ${value}`);
        DemoInfo.append("p")
            .text(`${key}: ${value}`)
    }


};



// Creates the Defaul Demographic Info in the Panel
importJSON.then((incomingData) => {
    var idsNames = incomingData.names;
    var metadata = incomingData.metadata;
    var samples = incomingData.samples;

    var noID = parseInt(SubjectID.property('value'));

    var metadataDemoInfo = metadata.find((metadata) => metadata.id === noID);
    createDemoInfo(metadataDemoInfo)


    var countIDS = idsNames.map(x => [x, 0]);
    samples.forEach(sampleElement => {
        sampleElement['otu_ids'].forEach(otu_idsElement => {
            // console.log(otu_idsElement)
            countIDS.forEach(ids => {
                // console.log(typeof ids[0])
                // console.log(typeof otu_idsElement)
                if (otu_idsElement === parseInt(ids[0])) {
                    ids[1] = ids[1] + 1;

                }
            })
        })
    })



    var sortedcountIDS = countIDS.sort(function sortFunction(a, b) {
        return b[1] - a[1];
    });
    // console.log(sortedcountIDS)

    xvalues = [];
    yvalues = [];

    sortedcountIDS.forEach(count => {
        // console.log(count[0])
        xvalues.push(count[0])
        yvalues.push(count[1])
    })

    console.log(xvalues.slice(0, 10));
    console.log(yvalues.slice(0, 10));
    var trace = {
        type: 'bar',
        orientation: 'h',
        x: xvalues.slice(0, 10),
        y: yvalues.slice(0, 10),
    };

    var layout = {
        title: {
            text: "Top 10 Bacteria Cultures Found",
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


function optionChanged() {
    var noID = parseInt(SubjectID.property('value'));
    // console.log(typeof noID)
    importJSON.then((incomingData) => {
        var idsNames = incomingData.names;
        var metadata = incomingData.metadata;
        var samples = incomingData.samples;


        var metadataDemoInfo = metadata.find((metadata) => metadata.id === noID);
        createDemoInfo(metadataDemoInfo)


    })

};

// // Use d3.json() to fetch data from JSON file
// // Incoming data is internally referred to as incomingData
// d3.json("samples.json").then((incomingData) => {
//     var idsNames = incomingData.names;
//     var metadata = incomingData.metadata;
//     var samples = incomingData.samples;

//     // console.log(idsNames);
//     // console.log(metadata);
//     // console.log(samples);
//     var countIDS = idsNames.map(x => [x, 0]);


//     samples.forEach(sampleElement => {
//         sampleElement['otu_ids'].forEach(otu_idsElement => {
//             // console.log(otu_idsElement)
//             countIDS.forEach(ids => {
//                 // console.log(typeof ids[0])
//                 // console.log(typeof otu_idsElement)
//                 if (otu_idsElement === parseInt(ids[0])) {
//                     ids[1] = ids[1] + 1;

//                 }
//             })
//         })
//     })



//     var sortedcountIDS = countIDS.sort(function sortFunction(a, b) {
//         return b[1] - a[1];
//     });
//     // console.log(sortedcountIDS)
// });





