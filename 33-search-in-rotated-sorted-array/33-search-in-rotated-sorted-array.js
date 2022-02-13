// test case [1,3,5], 3

// const getTargetFromArray = (offset, superArray, target) => {
//     const leftIdx = 0;
//     const rightIdx = superArray.length-1;
//     const middleIndex = Math.floor((leftIdx+rightIdx)/2); // prefer floor > ceil bc off-by-1 index
//     let leftWindowTargetIndex = -1;
//     let rightWindowTargetIndex = -1;

//     // TODO: optimize mem by not constructing new arrays here
//     const leftSubArray = superArray.slice(leftIdx, middleIndex);
//     const rightSubArray = superArray.slice(middleIndex, rightIdx+1);
//     const leftSubArrayOffset = offset+leftIdx;
//     const rightSubArrayOffset = offset+middleIndex;
    
//     console.log({offset, leftSubArray, rightSubArray, leftSubArrayOffset, rightSubArrayOffset});

//     // terminate recursion if length < 3
//     if (leftSubArray.length < 3) {
//         if (leftSubArray[0] === target) {
//             leftWindowTargetIndex = 0 + leftSubArrayOffset;
//             console.log({leftWindowTargetIndex})
//         } else if (leftSubArray[1] === target) {
//             leftWindowTargetIndex = 1 + leftSubArrayOffset;
//         } else{
//             leftWindowTargetIndex = -1;
//         }
//     } else {
//         // TODO: optimize run time by returning 1 early if target is not in range by checking edges
//         // eg for `[4,5,6,7,0,1,2], 0`; i should never check subarrray [4,5,6]
//         leftWindowTargetIndex = getTargetFromArray(leftSubArrayOffset, leftSubArray, target);
//     }

//     if (rightSubArray.length < 3) {
//         if (rightSubArray[0] === target) {
//             rightWindowTargetIndex = 0 + rightSubArrayOffset;
//         } else if (rightSubArray[1] === target) {
//             rightWindowTargetIndex = 1 + rightSubArrayOffset;
//         } else {
//             rightWindowTargetIndex = -1;
//         }
//     } else {
//         console.log({rightSubArray, offset:rightSubArrayOffset})
//         rightWindowTargetIndex = getTargetFromArray(rightSubArrayOffset, rightSubArray, target);
//     }

//     if (leftWindowTargetIndex === -1) {
//         if (rightWindowTargetIndex === -1) {
//             return -1;
//         } else {
//             return rightWindowTargetIndex;
//         }
//     }

//     return leftWindowTargetIndex;
// }

// /**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number}
//  */
// var search = function(nums, target) {
//     // naive is o(n) loop thru nums
//     // faster would be binary search; I'll prefer recursive implementation
//     // time: O(log(n)), space: O(n) (bc i have left subarray and right subarray)
//     // possible to do space O(logN)
//     //     or even O(1) if i search nums in-place only tracking pointers

//     return getTargetFromArray(0, nums, target);
// };

// test case [1,3,5], 3

const getTargetFromArray = (superArray, target, startIdx, endIdx) => {
    const middleIndex = Math.floor((startIdx+endIdx)/2); // prefer floor > ceil bc off-by-1 index
    let leftWindowTargetIndex = -1;
    let rightWindowTargetIndex = -1;

    const leftSubArrayStartIdx = startIdx;
    const leftSubArrayEndIdx = middleIndex;
    
    const rightSubArrayStartIdx = middleIndex+1;
    const rightSubArrayEndIdx = endIdx;

    const leftSubArrayOffset = leftSubArrayStartIdx;
    const rightSubArrayOffset = middleIndex+1;

    // terminate recursion if length < 3
    if (leftSubArrayEndIdx - leftSubArrayStartIdx < 2) {
        if (superArray[leftSubArrayStartIdx] === target) {
            leftWindowTargetIndex = 0 + leftSubArrayOffset;
        } else if (superArray[leftSubArrayEndIdx] === target) {
            leftWindowTargetIndex = 1 + leftSubArrayOffset;
        } else{
            leftWindowTargetIndex = -1;
        }
    } else {
        // TODO: optimize run time by returning 1 early if target is not in range by checking edges
        // eg for `[4,5,6,7,0,1,2], 0`; i should never check subarrray [4,5,6]
        leftWindowTargetIndex = getTargetFromArray(superArray, target, leftSubArrayStartIdx, leftSubArrayEndIdx);
    }

    if (rightSubArrayEndIdx - rightSubArrayStartIdx < 2) {
        if (superArray[rightSubArrayStartIdx] === target) {
            rightWindowTargetIndex = 0 + rightSubArrayOffset;
        } else if (superArray[rightSubArrayEndIdx] === target) {
            rightWindowTargetIndex = 1 + rightSubArrayOffset;
        } else{
            rightWindowTargetIndex = -1;
        }
    } else {
        rightWindowTargetIndex = getTargetFromArray(superArray, target, rightSubArrayStartIdx, rightSubArrayEndIdx);
    }

    if (leftWindowTargetIndex === -1) {
        if (rightWindowTargetIndex === -1) {
            return -1;
        } else {
            return rightWindowTargetIndex;
        }
    }

    return leftWindowTargetIndex;
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // naive is o(n) loop thru nums
    // faster would be binary search; I'll prefer recursive implementation
    // time: O(log(n)), space: O(n) (bc i have left subarray and right subarray)
    // possible to do space O(logN)
    //     or even O(1) if i search nums in-place only tracking pointers

    return getTargetFromArray(nums, target, 0, nums.length-1);
};
