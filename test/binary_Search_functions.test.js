const { binarySearch, arraysAreEqual } = require('./binary_Search_functions');

test('binarySearch function 1', () => {
    expect(binarySearch( [10, 21, 29, 42, 61, 92, 99], 42)).toEqual({index: 3, searchedElements: [42]});
});

test('binarySearch function 2', () => {
    expect(binarySearch( [10, 21, 29, 42, 61, 92, 99], 10)).toEqual({index: 0, searchedElements: [10, 21, 29, 10, 10]});
});

test('binarySearch function 3', () => {
    expect(binarySearch( [10, 21, 29, 42, 61, 92, 99], 99)).toEqual({index: 6, searchedElements: [61, 92, 99, 99, 99]});
});

test('arraysAreEqual 1', () => {
    expect(arraysAreEqual( [10, 21, 29, 42, 61, 92, 99], [10, 21, 29, 42, 61, 92, 99])).toBeTruthy();
});

test('arraysAreEqual 2', () => {
    expect(arraysAreEqual( [10, 21, 29, 42, 61, 92, 0], [10, 21, 29, 42, 61, 92, 99])).toEqual([6]);
});