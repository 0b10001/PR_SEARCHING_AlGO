const { generateTreeEdges, numbersToLetters, depthFirstSearch, breadthFirstSearch } = require('./Dfs_And_Bfs_Script_functions');

test('generateTreeEdges', () => {
    //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    var numNodes = Math.floor(Math.random() * (26 - 2 + 1) + 2);
    const edges = generateTreeEdges(numNodes);
    expect(edges.length).toBeGreaterThanOrEqual(numNodes);
});

test('depthFirstSearch 1', () => {
    const data = [
        ['a','b'],
        ['a','c'],
        ['a','d'],
        ['b','e'],
        ['b','f'],
        ['b','g'],
        ['c','k'],
        ['c','l'],
        ['d','h'],
        ['f','i'],
        ['f','j'],
        ['g','j'],
        ['h','d'], 
        ['h','m'],
        ['i','n'],
        ['j','n'],
        ['l','m'],
        ['l','o'], 
        ['m','h'] 
    ];    
    expect(depthFirstSearch(data, 'a')).toEqual(['a','b','e','f','i','n','j','g','c','k','l','m','h','d','o']);
});

test('breadthFirstSearch 1', () => {
    const data = [
        ['a','b'],
        ['a','c'],
        ['a','d'],
        ['b','e'],
        ['b','f'],
        ['b','g'],
        ['c','k'],
        ['c','l'],
        ['d','h'],
        ['f','i'],
        ['f','j'],
        ['g','j'],
        ['h','d'], 
        ['h','m'],
        ['i','n'],
        ['j','n'],
        ['l','m'],
        ['l','o'], 
        ['m','h'] 
    ];  
    expect(breadthFirstSearch(data, 'a')).toEqual(['a','b','c','d','e','f','g','k','l','h','i','j','m','o','n']);
})