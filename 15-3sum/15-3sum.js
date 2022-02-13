const ascendingSort = arr => arr.sort((a,b) => a-b);

const twoSum = (nums, target, currThirdNumberIdx, left, right) => {
    const results = [];

    while (left < right) {
        const leftValue = nums[left];
        const rightValue = nums[right];
        const twoSum = rightValue + leftValue;

        if (twoSum < target) {
            // increment twoSum
            left++;
        } else if (twoSum > target) {
            // decrement twoSum
            right--;
        } else {
            results.push(ascendingSort([nums[currThirdNumberIdx], leftValue, rightValue]))
            
            // ensure we don't add duplicate triplets
            let nextLeft = left+1;
            let nextRight = right-1;
            while (nums[nextLeft] === leftValue) nextLeft++;
            while (nums[nextRight] === rightValue) nextRight--;
            left = nextLeft;
            right = nextRight;
        }
    }
    return results;
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    // brute force n^3 three-level loop
    // better approach: solve two-sum optimally and add an outer loop O(n^2) time, O(1) space (if allowed to sort in-place)
    // two-sum optimal solution, two approaches: hashmap has o(n) space, but sorted array using pointers has constant sapce
    let prev = null;
    const results = [];
    ascendingSort(nums)

    for (let i = 0; i < nums.length; i++) {
        const currValue = nums[i];

        if (currValue > 0) {
            // since window is always to the right of currValue
            // we will never sum to 0 in or after this block
            break
        }

        // only check if the target is a new value to prevent dups
        if (currValue !== prev) {
            const currResults = twoSum(nums, -currValue, i, i+1, nums.length-1);
            results.push(...currResults);
        }
        
        prev = currValue;
    }

    return results;
};