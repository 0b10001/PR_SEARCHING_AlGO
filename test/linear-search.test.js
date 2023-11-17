const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('./frontend/html/linear-search.html', 'utf-8');
const dom = new JSDOM(html);

global.document = dom.window.document;


// Import the function to be tested
const { getRandomNumber5, getRandomNumber, getRandomNumbersList} = require('../frontend/scripts/linear-search.js');

describe('getRandomNumber5', () => {

    // Returns a random integer between 0 and 5 (inclusive)
    it('should return a random integer between 0 and 5', () => {
      const randomNumber = getRandomNumber5();
      expect(randomNumber).toBeGreaterThanOrEqual(0);
      expect(randomNumber).toBeLessThanOrEqual(5);
      expect(Number.isInteger(randomNumber)).toBe(true);
    });

    // Returns 0 when Math.random() returns 0
    it('should return 0 when Math.random() returns 0', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0);
      const randomNumber = getRandomNumber5();
      expect(randomNumber).toBe(0);
      Math.random.mockRestore();
    });

    // Returns 4 when Math.random() returns 0.8
    it('should return 4 when Math.random() returns 0.8', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.8);
      const randomNumber = getRandomNumber5();
      expect(randomNumber).toBe(4);
      Math.random.mockRestore();
    });

    // Returns 0 when Math.random() returns 0.0000000001
    it('should return 0 when Math.random() returns 0.0000000001', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.0000000001);
      const randomNumber = getRandomNumber5();
      expect(randomNumber).toBe(0);
      Math.random.mockRestore();
    });

    // Returns 5 when Math.random() returns 0.9999999999
    it('should return 5 when Math.random() returns 0.9999999999', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.9999999999);
      const randomNumber = getRandomNumber5();
      expect(randomNumber).toBe(5);
      Math.random.mockRestore();
    });

    // Returns 2 when Math.random() returns 0.4
    it('should return 2 when Math.random() returns 0.4', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.4);
      const randomNumber = getRandomNumber5();
      expect(randomNumber).toBe(2);
      Math.random.mockRestore();
    });
});

describe('getRandomNumber', () => {

    // Returns a random integer between 0 and 9 (inclusive)
    it('should return a random integer between 0 and 9', () => {
      const randomNumber = getRandomNumber();
      expect(randomNumber).toBeGreaterThanOrEqual(0);
      expect(randomNumber).toBeLessThanOrEqual(9);
      expect(Number.isInteger(randomNumber)).toBe(true);
    });

    // The probability of each integer being returned is equal
    it('should have equal probability for each integer', () => {
        const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const iterations = 100000;
      
        for (let i = 0; i < iterations; i++) {
          const randomNumber = getRandomNumber();
          counts[randomNumber]++;
        }
      
        const expectedProbability = iterations / 10;
        counts.forEach(count => {
          expect(count).toBeCloseTo(expectedProbability, -3); // or -4
        });
      });
      
      

    // The function always returns an integer
    it('should always return an integer', () => {
      const randomNumber = getRandomNumber();
      expect(Number.isInteger(randomNumber)).toBe(true);
    });

    // The function returns 0 when Math.random() returns 0
    it('should return 0 when Math.random() returns 0', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0);
      const randomNumber = getRandomNumber();
      expect(randomNumber).toBe(0);
      jest.restoreAllMocks();
    });

    // The function returns 9 when Math.random() returns 0.9999999999
    it('should return 9 when Math.random() returns 0.9999999999', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.9999999999);
      const randomNumber = getRandomNumber();
      expect(randomNumber).toBe(9);
      jest.restoreAllMocks();
    });

    // The function returns 0 when Math.random() returns 0.0000000001
    it('should return 0 when Math.random() returns 0.0000000001', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.0000000001);
      const randomNumber = getRandomNumber();
      expect(randomNumber).toBe(0);
      jest.restoreAllMocks();
    });
});

describe('getRandomNumbersList', () => {

    // Returns a list of random numbers of specified length
    it('should return a list of random numbers of specified length', () => {
      const length = 5;
      const result = getRandomNumbersList(length);
      expect(result).toHaveLength(length);
      expect(result).toEqual(expect.arrayContaining(result));
    });

    // Returns a list with unique numbers
    it('should return a list with unique numbers', () => {
      const length = 5;
      const result = getRandomNumbersList(length);
      const uniqueSet = new Set(result);
      expect(uniqueSet.size).toBe(length);
    });

    // Returns a list with numbers from 0 to 9
    it('should return a list with numbers from 0 to 9', () => {
      const length = 10;
      const result = getRandomNumbersList(length);
      expect(result).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
    });

    // Returns an empty list when length is 0
    it('should return an empty list when length is 0', () => {
      const length = 0;
      const result = getRandomNumbersList(length);
      expect(result).toHaveLength(0);
    });

    // Returns a list with a single number when length is 1
    it('should return a list with a single number when length is 1', () => {
      const length = 1;
      const result = getRandomNumbersList(length);
      expect(result).toHaveLength(1);
      expect(result[0]).toBeGreaterThanOrEqual(0);
      expect(result[0]).toBeLessThanOrEqual(9);
    });
});