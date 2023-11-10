//declaring variables
const arrayContainer = document.getElementById('array-container');
const nextButton = document.getElementById('next-button');
const checkButton = document.getElementById('check-button');
const questionContainer = document.getElementById('question-container');
const emptyBoxesContainer = document.getElementById('empty-boxes');
const lowInput = document.getElementById('low');
const midInput = document.getElementById('mid');
const highInput = document.getElementById('high');
const list = document.getElementById('list');
const searchButton = document.getElementById('search-button');
let draggedItem = null;
const emptyBoxes = [];
var result=0;
var array = [];
let x;


/*
The function that generates arrays of different sizes and also creates the empty boxes for user input

*/
function generateRandomArray() {
    lowInput.value = '';
    midInput.value = '';   //This clears the values of the low,mid and high
    highInput.value = '';
    
     // Clear the result
     document.getElementById('result').textContent = '';

    let min, max;
    if (document.getElementById('small-list').checked) {
        min = 5;
        max = 14;
    } else {
        min = 15;
        max = 31;
    }
    array.length = 0;
    const randomIndex =Math.floor(Math.random() * (max - min + 1)) + min; //This is generating a random number

    
    while (array.length < randomIndex) {
        var r = Math.floor(Math.random() * 100) + 1;
        if (array.indexOf(r) === -1) array.push(r);
    }
    // Sort the array in ascending order
    array.sort((a, b) => a - b);
    
    // Clear the array container
    arrayContainer.innerHTML = '';
    const randomItemIndex = Math.floor(Math.random() * randomIndex);
    x = array[randomItemIndex];

    const xPlaceholder = document.getElementById('x-placeholder');
    xPlaceholder.textContent =`${x}`;                               //This is displaying the number we are searching for

    array.forEach((item, index) => {
        const container = document.createElement('div');
        container.classList.add('number-box-container');
    
        const box = document.createElement('div');
        box.classList.add('number-box');
        box.textContent = item;
    
        // Add drag-and-drop functionality for this box
        box.draggable = true;
        box.addEventListener('dragstart', (e) => {
            draggedItem = e.target;
            e.dataTransfer.setData('text/plain', e.target.textContent);
        });

       
    
        const indexElement = document.createElement('div');
        indexElement.classList.add('index');
        indexElement.textContent = ` ${index}`;
    
        container.appendChild(box);
        container.appendChild(indexElement);
    
        arrayContainer.appendChild(container);
    });

   

    emptyBoxesContainer.innerHTML = '';
    emptyBoxes.length = 0; // Clear the empty boxes array
    var boxesE=(randomIndex)/2;
    

    while (boxesE > 0) {
        for (let i = 0; i < (boxesE); i++) {
            const empty = document.createElement('div');
            empty.classList.add('number-box-container');
            const emptyBox = document.createElement('div');
            emptyBox.classList.add('empty-boxes');
            emptyBox.textContent = ''; // Initialize empty boxes with no content
            emptyBoxesContainer.appendChild(emptyBox);
            emptyBoxes.push(emptyBox);
            
        }   // Add empty box reference to the array
        
        const lineBreak = document.createElement('br'); // Create a line break element
        emptyBoxesContainer.appendChild(lineBreak);
        boxesE = Math.floor(boxesE / 2); 
        
        // Reduce the number of boxes by half (integer division)
    }
    const empty = document.createElement('div');
    empty.classList.add('number-box-container');
    const emptyBox = document.createElement('div');
    emptyBox.classList.add('empty-boxes');
    emptyBox.textContent = ''; // Initialize empty boxes with no content
    emptyBoxesContainer.appendChild(emptyBox);
    emptyBoxes.push(emptyBox);

    result = binarySearch(array, x); // generates the solution


}


function indexHighlight() {
    const low = parseInt(lowInput.value);
    const mid = parseInt(midInput.value);
    const high = parseInt(highInput.value);

    // Reset previous highlights
    const arrayItems = arrayContainer.querySelectorAll('.number-box');
    arrayItems.forEach(item => item.classList.remove('highlight-low', 'highlight-mid', 'highlight-high'));

    // Highlight "low," "mid," and "high"
    if (arrayItems[low]) {
        arrayItems[low].classList.add('highlight-low');
    } else {
        console.error('Element not found at index ' + low);
    }

    if (arrayItems[mid]) {
        arrayItems[mid].classList.add('highlight-mid');
    } else {
        console.error('Element not found at index ' + mid);
    }

    if (arrayItems[high]) {
        arrayItems[high].classList.add('highlight-high');
    } else {
        console.error('Element not found at index ' + high);
    }
}


function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  const elementsSearched = []; // Array to store elements being searched

  while (left <= right) {
    
    let mid = Math.floor((left + right) / 2);// Calculate the middle index

    
    if (arr[mid] === target) {  // Check if the middle element is equal to the target
      elementsSearched.push(arr[mid])
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

  
  
function getIntValuesInEmptyBoxes() {
    const continuousIndexes=[];
    const intValuesInEmptyBoxes = emptyBoxes.map(emptyBox => {
      const textContent = emptyBox.textContent;
      // Use parseInt to convert the text content to an integer
      const intValue = parseInt(textContent, 10); // Base 10 for decimal numbers
      return isNaN(intValue) ? null : intValue; // Handle non-integer values gracefully
    });
    let j=0;
    for(let i=0;i<intValuesInEmptyBoxes.length;i++){
        if(intValuesInEmptyBoxes[i]!=null){
            continuousIndexes[j]=intValuesInEmptyBoxes[i];
            j++
        }
    }
    return continuousIndexes;
  }


function checkArrays() {
    const intValuesInEmptyBoxes = getIntValuesInEmptyBoxes(); // The input of the user
    console.log(intValuesInEmptyBoxes);
  
    const differences = arraysAreEqual(result.searchedElements, intValuesInEmptyBoxes); // Compare the user input the answer generated by the implemented binary search
  
    const resultElement = document.getElementById('result');
  
    if (differences === true) {
      resultElement.textContent = 'Correct';
      resultElement.className = 'correct';
    } else {
      resultElement.textContent = 'Incorrect. First error at index: ' + differences[0];
      resultElement.className = 'incorrect';
    }
  }
  
// Event listener for the Search button
searchButton.addEventListener('click', indexHighlight);
checkButton.addEventListener('click',checkArrays);

// Add event listener to the "Next" button
nextButton.addEventListener('click', generateRandomArray);


generateRandomArray();

emptyBoxesContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

emptyBoxesContainer.addEventListener('drop', (e) => {
    e.preventDefault();

    // Retrieve the text content from the dataTransfer object
    const data = e.dataTransfer.getData('text/plain');

    // Find the empty box where the element was dropped
    const emptyBox = emptyBoxes.find(box => e.target === box);

    if (emptyBox) {
        emptyBox.textContent = data; 
        // Replace the content of the specific empty box
    }
});

emptyBoxesContainer.addEventListener('dragstart', (e) => {
  draggedItem = e.target;
  e.dataTransfer.setData('text/plain', e.target.textContent);
});

emptyBoxesContainer.addEventListener('dragend', (e) => {
  const draggedBox = emptyBoxes.find(box => box.contains(draggedItem));

    if (draggedBox) {
        draggedBox.textContent = '';
    }
});

