/**
 * @param {number[]} w
 */
var Solution = function(w) {
    let accumulator = 0;
    this.accumulatedSums = []

    for (const weight of w) {
        accumulator += weight;
        this.accumulatedSums.push(accumulator);
    }

    this.lastAccumulatedSum = accumulator;
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function() {
    const target = Math.random()*this.lastAccumulatedSum;
    let left = 0;
    let right = this.accumulatedSums.length - 1;
    
    // for (let i = 0; i < this.accumulatedSums.length; i++) {
    //     if (target < this.accumulatedSums[i]) {
    //         return i;
    //     }
    // }
    
    // binary search to find where target < this.accumulatedSums[i]
    while (left < right) {
        let mid = Math.floor(left + ((right - left) / 2));
        if (target > this.accumulatedSums[mid]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
};

/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */