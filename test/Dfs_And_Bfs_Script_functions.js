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

module.exports = { generateTreeEdges, numbersToLetters, depthFirstSearch, breadthFirstSearch };