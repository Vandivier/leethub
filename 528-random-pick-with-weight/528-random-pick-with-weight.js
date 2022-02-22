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
    
    for (let i = 0; i < this.accumulatedSums.length; i++) {
        if (target < this.accumulatedSums[i]) {
            return i;
        }
    }
    // if you get this far there's a problem
    return -1;
};

/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */