var width=1000;
var height=630;
const stackNodes = [];
const queueNodes=[];
var visitedEdges = [];
var visitedNodes = [];
var nodes={}
var links = [];
var randomLabels;
var reversedData;


document.getElementById('nextButton').addEventListener('click', function () {
  
  location.reload(); 
});

/*The code that Handles the backend implementation of the UCS
  The Source of the algorithm https://www.scaler.com/topics/uniform-cost-search/ . It was in java I converted to javascript
   The UCS takes in the edges the source and the Destination as input
*/

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(node) {
    this.queue.push(node);
    this.queue.sort((a, b) => a.cost - b.cost);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

class UniformCostSearch {
  static INF = Number.MAX_SAFE_INTEGER;

  static findShortestPath(edges, n, source, destination) {
    const queue = new PriorityQueue();
    const visited = new Array(n).fill(false);

    const graph = new Map();
    for (let i = 0; i < n; i++) {
        graph.set(String.fromCharCode('S'.charCodeAt(0) + i), new Set());
    }

    for (let i = 0; i < edges.length; i++) {
        const [start, end, cost] = edges[i];
        if (!graph.has(start)) {
            graph.set(start, new Set());
        }
        graph.get(start).add(new Node(end, cost));
    }

    const startNode = new Node(source, 0);
    queue.enqueue({ node: startNode, path: [source] });

    let minCost = UniformCostSearch.INF;
    let minPath = [];

    while (!queue.isEmpty()) {
        const { node, path } = queue.dequeue();
        const cst = node.cost;

        if (node.vertex === destination) {
            if (cst < minCost) {
                minCost = cst;
                minPath = [...path];
            }
        } else {
            visited[node.vertex] = true;

            const neighbors = graph.get(node.vertex);
            if (neighbors) {
                for (const neighbor of neighbors) {
                    if (!visited[neighbor.vertex]) {
                        const newPath = [...path, neighbor.vertex];
                        queue.enqueue({ node: new Node(neighbor.vertex, neighbor.cost + cst), path: newPath });
                    }
                }
            }
        }
    }

    return { minCost, minPath };
}
}

class Node {
  constructor(vertex, cost) {
    this.vertex = vertex;
    this.cost = cost;
  }
}



// This randomly generate the cost of the edges
function generateRandomLabels(count) {
    // Generate an array of 'count' random numbers
    var labels = [];
    for (var i = 0; i < count; i++) {
        labels.push((Math.floor(Math.random() * 100 )+1).toString());
    }
    return labels;
}

// Generate the edges to create the graphs 

function generateTreeEdges(numNodes) {
  const edges = [];
  const nodes = Array.from({ length: numNodes }, (_, i) => i);

  // Generate tree edges
  for (let i = 1; i < numNodes; i++) {
    const node1 = nodes[i];
    const node2 = nodes[Math.floor(Math.random() * i)];
    edges.push([node1, node2]);
  }

  // Add the first cycle
  let node1 = nodes[numNodes - 1];
  let node2 = nodes[Math.floor(Math.random() * numNodes)];
  if (!hasEdge(edges, node1, node2) && node1!=node2) {
    edges.push([node1, node2]);
  }

  // Add the second cycle
  node1 = nodes[Math.floor(Math.random() * numNodes)];
  node2 = nodes[Math.floor(Math.random() * numNodes)];
  if (!hasEdge(edges, node1, node2) && node1!=node2) {
    edges.push([node1, node2]);
  }
   
  node1 = nodes[numNodes-1];
  node2 = nodes[7];
  if (!hasEdge(edges, node1, node2) && node1!=node2) {
    edges.push([node2, node1]);
  }


  return edges;
}

// Helper function to check if an edge exists between two nodes

function hasEdge(edges, node1, node2) {
  return edges.some(([n1, n2]) => (n1 === node1 && n2 === node2) || (n1 === node2 && n2 === node1));
}


//Edges are initially generated as numbers and later converted to letters


function numbersToLetters(numbersArray) {
  const alphabetArray = numbersArray.map(subArray => {
    return subArray.map(number => {
      if (number === 0) {
        return 'S';
      }
      return String.fromCharCode(64 + parseInt(number));
    });
  });
  return alphabetArray;
}
 
//Combines the cost and the Edges into one array

function combineArrays(edges, cost) {
  const combinedArray = [];

  for (let i = 0; i < edges.length; i++) {
    const edgeWithCost = [edges[i][0], edges[i][1], cost[i]];
    combinedArray.push(edgeWithCost);
  }

  return combinedArray;
}



var svg = d3.select('body').append('svg')
.attr('width', width)
.attr('height', height)
.attr("id", "graph-svg")
.attr("transform", "scale(" + 0.8+ ") ")


function generateGraph(){
            
    var svg1 = d3.select('#graph-svg');
    svg1.selectAll('*').remove();




    var dataset = [];
    //const numNodes = 18; // Change this to the number of nodes you want

    var inputNumNodes = document.querySelector(".numNodes");
    var numNodes = inputNumNodes.value;
    if (numNodes < 2 || numNodes > 26) {
        alert("Number of nodes must be at least 2 and less than 27");
        return // Exit the function to prevent further processing
    }
    

    const treeEdges = generateTreeEdges(numNodes);
    console.log(treeEdges);
    treeEdges.forEach((edge) => {
        dataset.push(edge);
    });

    /* This section of the code changes nodes from int to letters*/


    var dataInletters=numbersToLetters(dataset)

    /* This part of the code changes nodes to represent child and parent*/

    console.log(dataInletters)

    // Reverse the order of elements in each sub-array using map
      reversedData = dataInletters.map(item => [item[1], item[0]]);

    console.log(reversedData )
        
    
    // Split each line by comma
        
    for (var i = 0; i < reversedData.length ; i++) {
        // Split each line by comma
        var source = (reversedData[i][0]);           // First value becomes "child"
        var target= (reversedData [i][1]);          // Second value becomes "parent"

        var obj = {
        "source": source,
        "target": target
        };
        
        links.push(obj);
    }  

    console.log(links)

        
        

        links.forEach(function(link){
            link.source=nodes[link.source]||
            (nodes[link.source]={name:link.source});
            link.target=nodes[link.target]||
                (nodes[link.target]={name:link.target})

        });
        
        var force =d3.layout.force()
            .size([width,height])
            .nodes(d3.values(nodes))
            .links(links)
            .on("tick",tick)
            .linkDistance(200)
            .charge(-1000)
            .start();
        
        var link = svg.selectAll('.link')
            .data(links)
            .enter().append('line')
            .attr('class', 'link')
            .style('stroke', 'black')  // Add your desired edge color
            .attr('marker-end', 'url(#arrow)');

        var node=svg.selectAll('.node')
                .data(force.nodes())
                .enter().append('circle')
                .attr('class','node')
                .attr('r',width*0.025);

        var label = svg.selectAll('.label')
                .data(force.nodes())
                .enter().append('text')
                .attr('class', 'label')
                .text(function (d) {
                return d.name;
                })
                .attr('x', 10)
                .attr('y', 4);

        svg.append('defs').selectAll('marker')
                .data(['arrow']) // Marker name
                .enter().append('marker')
                .attr('id', d => d)
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', 30)  // Adjust as needed for arrowhead position
                .attr('refY', 0)
                .attr('markerWidth', 6)
                .attr('markerHeight', 8)
                .attr('orient', 'auto')
                .append('path')
                .attr('d', 'M0,-5L10,0L0,5');
                        
         randomLabels = generateRandomLabels(links.length);
        

        var edgeLabel = svg.selectAll('.edgeLabel')
                .data(links)
                .enter().append('text')
                .attr('class', 'edgeLabel')
                .text(function (d, i) {
                    // Use the randomly generated label for the edge
                    return  randomLabels[i];
                })
                .attr('x', function (d) { return (d.source.x + d.target.x) / 2; })
                .attr('y', function (d) { return (d.source.y + d.target.y) / 2; })
                .attr('text-anchor', 'middle')
                .attr('dy', -10);

        
               
                var visitedNodes = [];

                // ...
                
              function tick(e){
                  // Update regular labels positions
              label.attr('x', function (d) { return d.x; })
                  .attr('y', function (d) { return d.y; });
      
              // Update edge labels positions
              edgeLabel.attr('x', function (d) { return (d.source.x + d.target.x) / 2; })
                  .attr('y', function (d) { return (d.source.y + d.target.y) / 2; });
      
              // Update cost labels positions
              svg.selectAll('.costLabel')
                  .attr('x', function (d) { return d.target.x + 10; })
                  .attr('y', function (d) { return d.target.y; });
      
              // Update force layout for nodes and links
              node.attr('cx', function (d) { return d.x; })
                  .attr('cy', function (d) { return d.y; })
                  .call(force.drag);
      
              link.attr('x1', function (d) { return d.source.x; })
                  .attr('y1', function (d) { return d.source.y; })
                  .attr('x2', function (d) { return d.target.x; })
                  .attr('y2', function (d) { return d.target.y; });
                  
      
              }
 }  
        
generateGraph()
//This function Deals with Calculating the cumulated Costs and displaying the cost on the edges
function calculateCost() {
   
   var visitedNode = document.getElementById('visitedNodes').value;  // Get the visited node from the input field

  
   if (!nodes[visitedNode]) {
       alert("Visited node not found");   // Check if the visited node exists in the nodes
       return;
   }

   if (visitedNodes.includes(visitedNode)) {
    return;
}

   // Calculate the cost from the starting node ('S') to the visited node
   var costToVisitedNode = 0;
   var currentNode = visitedNode;
   while (currentNode !== 'S') {
       // Find the link corresponding to the current node and its parent
       var linkToParent = links.find(link => link.target.name === currentNode);
       // Add the cost to the total cost
       costToVisitedNode += parseInt(randomLabels[links.indexOf(linkToParent)]);
       // Move to the parent node
       currentNode = linkToParent.source.name;
   }

   // Update and display the cost for each child of the visited node
   links.forEach(function (link, index) {
       if (link.source.name === visitedNode && !svg.select('.costLabel' + index).node()) {
           // Calculate the total cost from 'S' to the child node
           var totalCost = costToVisitedNode + parseInt(randomLabels[index]);

           // Create a group for the cost label
           var costLabelGroup = svg.append('g')
               .attr('class', 'costLabel costLabel' + index)
               .attr('transform', 'translate(' + (link.target.x + 35) + ',' + link.target.y + ')'); 

           // Add a small circle to represent the cost
           costLabelGroup.append('circle')
               .attr('r', 15)  
               .style('fill', 'rgb(236, 12, 188)');  

           // Add a text label inside the circle with the cost
           costLabelGroup.append('text')
               .text(totalCost)  
               .attr('text-anchor', 'middle')
               .attr('dy', 5)
               .style('fill', 'white');  
       }
   });

   svg.selectAll('.node')
        .filter(function (d) {
            return d.name === visitedNode;
        })
        .classed('visited-node', true);

    
    links.forEach(function (link) {  // Highlight the visited edges
        if (link.source.name === visitedNode && !visitedEdges.includes(links.indexOf(link))) { // Highlight the edge   
            svg.select('.link' + links.indexOf(link)).classed('visited-edge', true);
            visitedEdges.push(links.indexOf(link));
        }
    });;


      }

  //This compares the user generated answer and the Correct Answer
      
  function markInput() {
   const edgesAndCost = combineArrays(reversedData, randomLabels);
   const minCost = UniformCostSearch.findShortestPath(edgesAndCost, 10, 'S', 'G');
   console.log((minCost.minPath).join(''));
   console.log("Minimum cost from", 'S', "to", 'G', "is =", minCost.minCost);

    
    var inputElement = document.querySelector(".input-box");
    var inputValue = inputElement.value;

    if (inputValue === (minCost.minPath).join('')) {
       
        const messageElement = document.getElementById("correctness-message"); // Display "correct" message in green next to the button
        messageElement.textContent = "correct";
        messageElement.className = "correct-message";
    } else {
        
        const messageElement = document.getElementById("correctness-message");// Display "incorrect" message in red next to the button
        messageElement.textContent = "incorrect";
        messageElement.className = "incorrect-message";
}
        
}


  
    