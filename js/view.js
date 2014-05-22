var width = 500,
    height = 500;
var diameter = 300;
var duration = 2000;

// d3.selectAll("input").on("change", change);


function change(){
    console.log("HERE");
    var current_mode = $('input[name=mode]:checked', '#mode-form').val();
    if (current_mode === "radialtree")
        transitionToRadialTree();
    else if (current_mode === "radialcluster")
        transitionToRadialCluster();
    else if (current_mode === "tree")
        transitionToTree();
    else
        transitionToCluster();
};
    

function transitionToRadialTree() {

    var nodes = radialTree.nodes(root), // recalculate layout
        links = radialTree.links(nodes);
    
    svg.transition().duration(duration)
        .attr("transform", "translate(" + (width/2) + "," +
                                          (height/2) + ")");
        // set appropriate translation (origin in middle of svg)
    
    link.data(links)
        .transition()
        .duration(duration)
        .style("stroke", "#fc8d62")
        .attr("d", radialDiagonal); //get the new radial path

    node.data(nodes)
        .transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
        });
    
    node.select("circle")
        .transition()
        .duration(duration)
        .style("stroke", "#984ea3");
    
};

function transitionToRadialCluster() {

    var nodes = radialCluster.nodes(root), // recalculate layout
        links = radialCluster.links(nodes);
    
    svg.transition().duration(duration)
        .attr("transform", "translate(" + (width/2) + "," +
                                          (height/2) + ")");
        // set appropriate translation (origin in middle of svg)
    
    link.data(links)
        .transition()
        .duration(duration)
        .style("stroke", "#66c2a5")
        .attr("d", radialDiagonal); //get the new radial path

    node.data(nodes)
        .transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
        });
    
    node.select("circle")
        .transition()
        .duration(duration)
        .style("stroke", "#4daf4a");

};

function transitionToTree() {
    
    var nodes = tree.nodes(root), //recalculate layout
        links = tree.links(nodes);

    svg.transition().duration(duration)
        .attr("transform", "translate(40,0)");
        
    link.data(links)
        .transition()
        .duration(duration)
        .style("stroke", "#e78ac3")
        .attr("d", diagonal); // get the new tree path

    node.data(nodes)
        .transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });
    
    node.select("circle")
        .transition()
        .duration(duration)
        .style("stroke", "#377eb8");

};

function transitionToCluster() {
    
    var nodes = cluster.nodes(root), //recalculate layout
        links = cluster.links(nodes);
    
    svg.transition().duration(duration)
        .attr("transform", "translate(40,0)");
  
    link.data(links)
        .transition()
        .duration(duration)
        .style("stroke", "#8da0cb")
        .attr("d", diagonal); //get the new cluster path

    node.data(nodes)
        .transition()
        .duration(duration)
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });
    
    node.select("circle")
        .transition()
        .duration(duration)
        .style("stroke", "#e41a1c");
    
};

var root; // store data in a variable accessible by all functions

var tree = d3.layout.tree()
    .size([height, width - 160]);

var cluster = d3.layout.cluster()
    .size([height, width - 160]);

var diagonal = d3.svg.diagonal()
    .projection(function (d) {
    return [d.y, d.x];
});

var radialTree = d3.layout.tree()
    .size([360, diameter / 2 ])
    .separation(function(a, b) {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
    });

var radialCluster = d3.layout.cluster()
    .size([360, diameter / 2 ])
    .separation(function(a, b) {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
    });

var radialDiagonal = d3.svg.diagonal.radial()
    .projection(function(d) {
        return [d.y, d.x / 180 * Math.PI];
    });


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(40,0)");

    var root = getData().children[0].children[0],
        nodes = cluster.nodes(root),
        links = cluster.links(nodes);

    console.log(root);

    var link = svg.selectAll(".link")
        .data(links)
       .enter()
        .append("path")
        .attr("class", "link")
        .style("stroke", "#8da0cb")
        .attr("d", diagonal);

    var node = svg.selectAll(".node")
        .data(nodes)
       .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
    })

    node.append("circle")
        .attr("r", 4.5)
        .style("stroke", "#e41a1c");

    node.append("text")
        .attr("dx", function (d) { return d.children ? -8 : 8; })
        .attr("dy", 3)
        // .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
        .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
        .text(function (d) { return d.letter; });

