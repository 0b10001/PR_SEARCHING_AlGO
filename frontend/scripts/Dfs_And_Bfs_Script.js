var width=1000;
var height=630;
const stackNodes = [];
const queueNodes=[];
var selectedSearchAlgorithm = "DFS";


function generateTreeEdges(numNodes) {
  const edges = [];
  const nodes = Array.from({ length: (numNodes) }, (_, i) => i);
  for (let i = 1; i < numNodes  ; i++) {
    const node1 = nodes[i];
    const node2 = nodes[Math.floor(Math.random() * i)];
    edges.push([node1, node2]);
  }

  // Introduce additional edges to form cycles
  for (let i = 0; i < 3; i++) {
    const node1 = nodes[Math.floor(Math.random() * numNodes)];
    const node2 = nodes[Math.floor(Math.random() * numNodes)];

    if (node1 !== node2) {
      edges.push([node1, node2]);
    }
  }

 
  return edges;
}

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

function depthFirstSearch(data, startNode) {
  const visited = new Set();
  const path = [];

  function dfs(node) {
    if (!visited.has(node)) {
      visited.add(node);
      path.push(node);

      const parents = data
        .filter(([child, parent]) => child === node)
        .map(([child, parent]) => parent);

      for (const parent of parents) {
        dfs(parent);
      }
    }
  }

  dfs(startNode);

  return path;
}

function breadthFirstSearch(data, startNode) {
    const visited = new Set();
    const queue = [startNode];
    const path = [];
  
    while (queue.length > 0) {
      const node = queue.shift(); // Dequeue the first node
      if (!visited.has(node)) {
        visited.add(node);
        path.push(node);
  
        const children = data
          .filter(([parent, child]) => parent === node)
          .map(([parent, child]) => child);
  
        queue.push(...children); // Enqueue the children
      }
    }
  
    return path;
  }

//updateSearchButtons();

function searchDFS() {
    selectedSearchAlgorithm = "DFS";
    document.getElementById("dfs-buttons").style.display = "block";
    document.getElementById("bfs-buttons").style.display = "none";
    document.getElementById("stack-container").style.display = "block";
    document.getElementById("queue-container").style.display = "none";
    document.getElementById("outputid").style.display = "block";
    document.getElementById("markbutton").style.display = "block";
    updateSearchButtons();
    generateNewGraph();

    
  }

function searchBFS() {
    selectedSearchAlgorithm = "BFS";
    document.getElementById("dfs-buttons").style.display = "none";
    document.getElementById("bfs-buttons").style.display = "block";
    document.getElementById("stack-container").style.display = "none";
    document.getElementById("queue-container").style.display = "block";
    document.getElementById("outputid").style.display = "block";
    document.getElementById("markbutton").style.display = "block";
    updateSearchButtons();
    generateNewGraph();
  }

function updateSearchButtons() {
    // Get the button elements
    const dfsButton = document.getElementById("dfs-button");
    const bfsButton = document.getElementById("bfs-button");
  
    // Remove the "active" class from both buttons
    dfsButton.classList.remove("active");
    bfsButton.classList.remove("active");
  
    // Add the "active" class to the selected button
    if (selectedSearchAlgorithm === "DFS") {
      dfsButton.classList.add("active");
    } else if (selectedSearchAlgorithm === "BFS") {
      bfsButton.classList.add("active");
    }
  }




var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("id", "graph-svg")
  .attr("transform", "scale(" + 0.8 + ") ");
            

var result;

function generateNewGraph(){

    clearStack(); // Call the clearStack function to clear the stack
    clearQueue()
    
    const messageElement = document.getElementById("correctness-message");
    messageElement.textContent = "";
    messageElement.className = "correctness-message";

    document.getElementById('outputid').value = '' 
     
    const stackContainer = document.getElementById("stack-container");
    while (stackContainer.firstChild) {
            stackContainer.removeChild(stackContainer.firstChild);
    }

    const queueContainer = document.getElementById("queue-container");
    while (queueContainer.firstChild) {
            queueContainer.removeChild(queueContainer.firstChild);
    }

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
  
    treeEdges.forEach((edge) => {
        dataset.push(edge);
    });

    /* This section of the code changes nodes from int to letters*/


    var dataInletters=numbersToLetters(dataset)

    /* This part of the code changes nodes to represent child and parent*/

  

    // Reverse the order of elements in each sub-array using map
    const  reversedData = dataInletters.map(item => [item[1], item[0]]);

    
        
    var links = [];
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

    

        
        var nodes={}

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
            .linkDistance(80 )
            .charge(-1000)
            .start();
        
        var link=svg.selectAll('.link')
                .data(links)
                .enter().append('line')
                .attr('class','link');

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

        
    
function tick(e){
            node.attr('cx',function(d){return d.x;})
                .attr('cy', function(d){return d.y;})
                .call(force.drag)

            link.attr('x1',function(d){return d.source.x})
            link.attr('y1',function(d){return d.source.y})
            link.attr('x2',function(d){return d.target.x})
            link.attr('y2',function(d){return d.target.y})

            // Update label positions
            label.attr('x', function (d) { return d.x; })
            .attr('y', function (d) { return d.y; });
        }
        
        
        if (selectedSearchAlgorithm === "DFS") {
            result = (depthFirstSearch(reversedData, 'S')).join('');
          } else if (selectedSearchAlgorithm === "BFS") {
            result = (breadthFirstSearch(reversedData, 'S')).join('');
          }
        
        }     

function markInput() {
        
        var inputElement = document.querySelector(".input-box");
        var inputValue = inputElement.value;

        if (inputValue === result) {
            // Display "correct" message in green next to the button
            const messageElement = document.getElementById("correctness-message");
            messageElement.textContent = "correct";
            messageElement.className = "correct-message";
        } else {
            // Display "incorrect" message in red next to the button
            const messageElement = document.getElementById("correctness-message");
            messageElement.textContent = "incorrect";
            messageElement.className = "incorrect-message";
    }
            
    }

      // Define an array to store the nodes on the stack

function pushNode() {
        const nodeInput = document.getElementById("nodeInput");
        const nodeValue = nodeInput.value;
    
        if (nodeValue) {
            const stackContainer = document.getElementById("stack-container");
    
            // Create a new node element
            const newNode = document.createElement("div");
            newNode.className = "stack-node";
            newNode.textContent = nodeValue;
    
            // Insert the new node at the beginning of the stack (top of the stack)
            stackContainer.insertBefore(newNode, stackContainer.firstChild);
    
            nodeInput.value = "";
    
            // Add the pushed node to the stackNodes array if it's not already there
            if (!stackNodes.includes(nodeValue)) {
                stackNodes.push(nodeValue);
            }
    
            // Highlight the corresponding graph node and edges if it's not already highlighted
            if (!newNode.classList.contains("highlighted-node")) {
                // Highlight the corresponding graph node and edges
                highlightGraphNodeAndEdges(stackNodes);
            }
        }
    }
    
    


function highlightGraphNodeAndEdges(stackNodes) {
        // Clear previous highlights
        svg.selectAll('.node').classed('highlighted-node', false);
        svg.selectAll('.link').classed('highlighted-edge', false);

        // Highlight the nodes on the stack
        svg.selectAll('.node')
            .filter(function (d) {
                return stackNodes.includes(d.name);
            })
            .classed('highlighted-node', true);

        // Find and highlight the edges between nodes on the stack
        stackNodes.forEach(function (node) {
            svg.selectAll('.link')
                .filter(function (d) {
                    return (
                        (d.source.name === node && stackNodes.includes(d.target.name)) ||
                        (d.target.name === node && stackNodes.includes(d.source.name))
                    );
                })
                .classed('highlighted-edge', true);
        });
    }

    

   // Function to uncolor a specific node
function uncolorNode() {
    const poppedNode = stackNodes.pop();

    // Clear previous highlights
    svg.selectAll('.node').classed('highlighted-node', false);
    svg.selectAll('.link').classed('highlighted-edge', false);

    // Highlight the nodes on the stack
    svg.selectAll('.node')
        .filter(function (d) {
            return stackNodes.includes(d.name);
        })
        .classed('highlighted-node', true);

    // Find and highlight the edges between nodes on the stack
    stackNodes.forEach(function (node) {
        svg.selectAll('.link')
            .filter(function (d) {
                return (
                    (d.source.name === node && stackNodes.includes(d.target.name)) ||
                    (d.target.name === node && stackNodes.includes(d.source.name))
                );
            })
            .classed('highlighted-edge', true);
    })
}


function queueuncolorNode() {
  const poppedNode = queueNodes.pop();

  // Remove the last node from the stackContainer in the UI
  const queueContainer = document.getElementById("queue-container");
  const nodes = queueContainer.getElementsByClassName("queue-node");
  if (nodes.length > 0) {
      queueContainer.removeChild(nodes[nodes.length - 1]);
  }

  // Clear previous highlights
  svg.selectAll('.node').classed('highlighted-node', false);
  svg.selectAll('.link').classed('highlighted-edge', false);

  // Highlight the nodes on the stack
  svg.selectAll('.node')
      .filter(function (d) {
          return queueNodes.includes(d.name);
      })
      .classed('highlighted-node', true);

  // Find and highlight the edges between nodes on the stack
  queueNodes.forEach(function (node) {
      svg.selectAll('.link')
          .filter(function (d) {
              return (
                  (d.source.name === node && queueNodes.includes(d.target.name)) ||
                  (d.target.name === node && queueNodes.includes(d.source.name))
              );
          })
          .classed('highlighted-edge', true);
  });
}




function popNode() {
  const stackContainer = document.getElementById("stack-container");
  const nodes = stackContainer.getElementsByClassName("stack-node");
  if (nodes.length > 0) {
      stackContainer.removeChild(nodes[0]); // Remove the first node (top of the stack)
  }
}

function enqueueNode() {
            const nodeInput = document.getElementById("queue-Input");
            const nodeValue = nodeInput.value;
            if (nodeValue) {
                const queueContainer = document.getElementById("queue-container");
                const newNode = document.createElement("div");
                newNode.className = "queue-node";
                newNode.textContent = nodeValue;
                queueContainer.appendChild(newNode);
                nodeInput.value = "";

                // Add the pushed node to the stackNodes array if it's not already there
                if (!queueNodes.includes(nodeValue)) {
                    queueNodes.push(nodeValue);
                }

                // Highlight the corresponding graph node and edges if it's not already highlighted
                if (!newNode.classList.contains("highlighted-node")) {
                    // Highlight the corresponding graph node and edges
                    highlightGraphNodeAndEdges(queueNodes);
                }
            }
        }

function dequeueNode() {
            const queueContainer = document.getElementById("queue-container");
            const nodes = queueContainer.getElementsByClassName("queue-node");
            if (nodes.length > 0) {
                queueContainer.removeChild(nodes[0]);
            }
        }

function clearStack() {
          stackNodes.length = 0; // Set the stackNodes array to an empty array
          const stackContainer = document.getElementById("stack-container");
          while (stackContainer.firstChild) {
              stackContainer.removeChild(stackContainer.firstChild);
          }
      }
      
function clearQueue() {
          queueNodes.length = 0; // Set the queueNodes array to an empty array
          const queueContainer = document.getElementById("queue-container");
          while (queueContainer.firstChild) {
              queueContainer.removeChild(queueContainer.firstChild);
          }
      }

    


         
      





