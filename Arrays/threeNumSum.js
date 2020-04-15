/**

-------------------------- Three Number Sum ---------------------------

Given a non-empty array of unique integers and a target sum, return all the triplets in the array that sum to the target sum. Return the triplets in a 2D array with the triplets in ascending order, and numbers within the triplets in ascending order. If there are no triplets, return an empty array.


----------------------- Thoughts and Pseudo Code -----------------------

Break the problem into steps.
Step 1: Find all possible combinations that sum to target
Step 2: Organize in ascending order by digit and by group

It is possible we can avoid Step 2 to begin with if we begin with a sorted array. We can consider that when we reach that stage.

For Step 1, we need to look at one number at a time. Then look at every other number, one at a time, and see if the this number needed exits in the array. We must check every number because the array is not sorted to begin with. It may end up being more efficient to sort first and then find combinations-- we will determine this after we flesh out our first attempt.

For example, given an array we would do something like this:
[1 2 3 4 5]
 1 2 3
 1 2   4
 1 2     5
 1   3 4
 1   3   5
 1     4 5
   2 3 4
   2 3   5
   2   4 5
     3 4 5

Because the array we are given is unsorted and we must look at every possible combination, and loop through 3 times, this looks like O(n^3). We could pontentially improve this with a hash table.

Attempt #1: Brute Force with a Triple Nested For-Loop
function threeNumSum(array, target) {
  let triplets = []
  for (let i=0; i<array.length-2; i++) {
    for (let j=1; j<array.length-1; j++) {
      for (k=2; k<array.length; k++) {
        if (arr[i]+arr[j]+arr[k] === target) {
          triplets.push([arr[i],arr[j],arr[k]])
        }
      }
    }
  }
  return triplets
}

If I want to sort the return result, this would add nlog(n) to my time complexity, but the final O(n) is still n^3. Perhaps I can improve if I sort first. We will assume the sort has O(nlog(n)) time complexity. With a sorted array we can potentially cut down on time because we can stop a search if the current running total is greater than the target.


-------------------------------- Code ----------------------------------

Attempt #2: Sort first, then find combinations
*/

function threeNumSum(arr, target) {
  arr.sort((a, b)=> a-b)
  let tripletNums = []

  for (let i=0; i<arr.length-2; i++) {
    if (arr[i] >= target) break;

    for (let j=i+1; j<arr.length-1; j++) {
      if (arr[i] + arr[j] >= target) break;

      for (let k=j+1; k<arr.length; k++) {
        if (arr[i] + arr[j] + arr[k] > target) break;
        else if (arr[i] + arr[j] + arr[k] === target) {
          tripletNums.push([arr[i], arr[j], arr[k]])
          break;
        }
      }
    }
  }

  return tripletNums
}

/**
----------------------- Time and Space Complexity ----------------------

The time complexity here is nlog(n) + n^3 which simplifies to O(n^3).

The space complexity here is O(1) or constant if you do not consider the resulting array. If you do, the worst case is that every number is part of a solution triplet and therefore the space complexity is O(n).

 */

module.exports = threeNumSum;

