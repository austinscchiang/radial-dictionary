var letterInputValue;
var tempRoot;

function makeGraphOnSubmit () {
	event.preventDefault();
	letterInputValue =$('#letters').val();
	getRootFromLetters(letterInputValue);
	resetData();
	transitionToCluster();
	return false;
}

function getRootFromLetters (startLetters) {
	tempRoot = getData();
	console.log("here");
		alert("hi");
	for (var i = 0 ; i < startLetters.length ; i++) {
		console.log(startLetters.charAt(i));
		for (var j = 0 ; j < tempRoot.children.length ; j++) {
			if(tempRoot.children[j].letter == startLetters.charAt(i)){
				tempRoot = tempRoot.children[j];
			}
		}
	}
	root = constructTree(startLetters);

}
function constructTree (startLetters) {
	if(startLetters.length == 0) {
		console.log("DONE");
		return tempRoot;
	}
	var node = {};

	node.letter = (startLetters.charAt(0));
	// console.log(node.letter);
	node.children = [];
	node.children.push(
		constructTree(startLetters.substring(1,startLetters.length))
	);
	return node;
}

function resetData (){
	nodes = cluster.nodes(root);
    links = cluster.links(nodes);
    link = svg.selectAll(".link")
        .data(links)
       .enter()
        .append("path")
        .attr("class", "link")
        .style("stroke", "#8da0cb")
        .attr("d", diagonal);

    node = svg.selectAll(".node")
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

}