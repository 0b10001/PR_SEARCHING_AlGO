function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    const elementsSearched = []; // Array to store elements being searched
  
    while (left <= right) {
      
      let mid = Math.floor((left + right) / 2);// Calculate the middle index
  
      
      if (arr[mid] === target) {  // Check if the middle element is equal to the target
        elementsSearched.push(arr[mid]);
        return { index: mid, searchedElements: elementsSearched };
      } else if (arr[mid] < target) {
        
        left = mid + 1;// If the middle element is less than the target, search the right half
        
        for (let i = left; i <= right; i++) { // Copy elements from updated left to left into the array
          elementsSearched.push(arr[i]);
        }
      } else {
        
        right = mid - 1; // If the middle element is greater than the target, search the left half
        
        for (let i = left; i <= right; i++) {// Copy elements from left to updated right into the array
          elementsSearched.push(arr[i]);
        }
      }
    }
  
    return { index: -1, searchedElements: elementsSearched };
}

function arraysAreEqual(arr1, arr2) {
    const differences = [];

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        differences.push(i);
      }
    }

    return differences.length === 0 ? true : differences;
}

module.exports = { binarySearch, arraysAreEqual }; 