/**
 * @param {number[]} nums
 * @return {number}
 */
// var maxSubArray = function(nums) {
//     if (nums.length === 1) return nums[0];

//     let hasPositive = false;
//     let hasNegative = false;
//     let maxValue = -Infinity;
//     let maxContiguous = -Infinity;
//     let total = 0;
    
//     // from left, never accept a negative if possible
//     // once we have a positive subgroup, only accept later subarray join if net positive
//     // kinda islands, almost need 'subarray sums array'
//     // naive approach: solve an easy case and extend it.
    
//     // naive solution:
//     // 2-stage subarray aggregation pattern
//     // every time i encounter a negative, start a new subarray sum
//     // collect an array of subarray sums
//     // in second stage, iterate left to right in agg array,
//     // select first positive,
//     // only join net wins later
//     // time complexity: O(2n)=>O(n), space O(n);
//     const subarraySums = [];
//     let currSubarraySum = 0;

//     for (let i = 0; i < nums.length; i++) {
//         const currValue = nums[i];
        
//         if (currValue > 0) {
//             hasPositive = true;
//         } else if (currValue < 0) {
//             hasNegative = true;
//         }

//         if (currSubarraySum*currValue < 0) {
//             // end currSubarraySum
//             subarraySums.push(currSubarraySum);
//             currSubarraySum = currValue;
//         } else {
//             // continue currSubarraySum
//             currSubarraySum += currValue;
//         }

//         maxValue = Math.max(maxValue, currValue);
//     }

//     // edge case: if there are no positive nums[i], return single maxValue
//     // edge case: if no negative values, return sum of all indices (it is a single contig subarray)
//     if (!hasPositive) {
//         return maxValue;
//     } else if (!hasNegative) {
//         return currSubarraySum;
//     }

//     // TODO: maybe I need leftSum, rightSum (single-index lookahead, NOT cumulative), and currValue at each index?
//     // TODO: do dynamic programming approach (max sum at index, then take maximum over all)
//     // [-1,1,-1,3, -210,4, -2, 100]
//     // [9,-1,15]
//     let currAggregateAccumulation = 0;

//     for (let i = 0; i < subarraySums.length; i++) {
//         const currSubarraySum = subarraySums[i];
//         const nextValue = i+1 === subarraySums.length ? 0 : subarraySums[i+1];

//         // test with single-index lookahead
//         const testAccumulationValue = currAggregateAccumulation+currSubarraySum+nextValue;

//         currAggregateAccumulation = testAccumulationValue >= currSubarraySum
//             ? currAggregateAccumulation+currSubarraySum
//             : currSubarraySum;

//         maxContiguous = Math.max(maxContiguous, currAggregateAccumulation);
//     }

//     return maxContiguous;
// };


var maxSubArray = function(nums) {
    let maxValue = nums[0];
    let currAccumulatedValue = maxValue;

    for (let i = 1; i < nums.length; i++) {
        const currValue = nums[i];
        currAccumulatedValue = Math.max(currAccumulatedValue+currValue, currValue);
        maxValue = Math.max(maxValue, currAccumulatedValue);
    }
    
    return maxValue;
}
