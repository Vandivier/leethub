// can solve slowly using hashmap+array: O(1) | N === Capacity
// faster using ordered hashmap (Map): O(1)
// also faster using double linked list + hashmap (but no faster + complex impl): O(1)

// longer custom test case for perf:
// ["LRUCache","put","put","get","put","get","put","get","get","get","put","put","get","put","get","put","get","get","get"]
// [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]

///////////////// BEGIN SLOW BUT CORRECT SOLUTION BEFORE VIEWING SOLUTION

// const refreshKeyInQueue = (queue, key) => {
//     const next = [];
//     const seen = {}; // note: set was slower

//     // slice out the key wherever it's found, and add to very end
//     // could do this in place via multiple slice
//     // but I think this is more intuitive, albeit more mem
//     for (const el of queue) {
//         if (el !== key && !seen[el]) {
//             next.push(el);
//         }

//         seen[el] = 1;
//     }

//     // refresh is not meant to append new keys
//     if (seen[key]) {
//         next.push(key);
//     }

//     // console.log({next, queue})
//     return next;
// }


// /**
//  * eg oldestKey === least recently used key
//  * @param {number} capacity
//  */
// var LRUCache = function(capacity) {
//     this._capacity = capacity;
//     this._map = {};
//     this._safetyQueue = [];
// };

// /** 
//  * @param {number} key
//  * @return {number}
//  */
// LRUCache.prototype.get = function(key) {
//     this._safetyQueue = refreshKeyInQueue(this._safetyQueue, key);
//     return this._map[key] === undefined ? -1 : this._map[key];
// };

// /** 
//  * @param {number} key 
//  * @param {number} value
//  * @return {void}
//  */
// LRUCache.prototype.put = function(key, value) {
//     if (this._map[key] === undefined) {
//         this._safetyQueue.push(key);
//     }

//     if (this._safetyQueue.length > this._capacity) {
//         const shifted = this._safetyQueue.shift();
//         this._map[shifted] = undefined;
//     }
    
//     // set after trim so "on the bubble" survives as intended
//     this._map[key] = value;

//     // console.log({map: this._map, key, value})
//     this._safetyQueue = refreshKeyInQueue(this._safetyQueue, key);
// };

// /** 
//  * Your LRUCache object will be instantiated and called as such:
//  * var obj = new LRUCache(capacity)
//  * var param_1 = obj.get(key)
//  * obj.put(key,value)
//  */


// const refreshKeyInQueue = (queue, key) => {
//     const next = [];
//     const seen = {}; // note: set was slower

//     // slice out the key wherever it's found, and add to very end
//     // could do this in place via multiple slice
//     // but I think this is more intuitive, albeit more mem
//     for (const el of queue) {
//         if (el !== key && !seen[el]) {
//             next.push(el);
//         }

//         seen[el] = 1;
//     }

//     // refresh is not meant to append new keys
//     if (seen[key]) {
//         next.push(key);
//     }

//     // console.log({next, queue})
//     return next;
// }


///////////////// END SLOW BUT CORRECT SOLUTION BEFORE VIEWING SOLUTION


// submit this a few times bc it will pass or fail based on random perf variation
/**
//  * eg oldestKey === least recently used key
//  * @param {number} capacity
//  */
var LRUCache = function(capacity) {
    this._capacity = capacity;
    this._orderedMap = new Map();
};

// // similar to Python OrderedDict's built-in .move_to_end():
// // https://realpython.com/python-ordereddict/#testing-for-equality-between-dictionaries
// // want a js lib? straight to jail:
// // https://github.com/mhweiner/js-ordered-dict
const refreshKeyInQueue = (orderedMapQueue, key, newValue) => {
    if (!orderedMapQueue.has(key) && newValue === undefined) {
        return undefined;
    }

    const priorVal = orderedMapQueue.get(key);
    const nextVal = newValue === undefined
                        ? priorVal
                        : newValue;

    orderedMapQueue.delete(key);
    orderedMapQueue.set(key, nextVal);
    
    return nextVal;
}

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    const valForKeyAfterRefresh = refreshKeyInQueue(this._orderedMap, key);
    // console.log({valForKeyAfterRefresh})
    return valForKeyAfterRefresh === undefined
        ? -1
        : valForKeyAfterRefresh;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    // micro-optimzation 1: set doesn't throw if u delete key that doesn't exist
    // this._orderedMap.delete(key);
    // this._orderedMap.set(key, value);

    // block below optimized by micro-optimization 1
    if (this._orderedMap.has(key)) {
        refreshKeyInQueue(this._orderedMap, key, value);
    } else {
        this._orderedMap.set(key, value);
    }

    // evict if needed
    if (this._orderedMap.size > this._capacity) {
        const firstKey = this._orderedMap.keys().next().value;
        this._orderedMap.delete(firstKey);
    }
};


// adapted from: https://stackoverflow.com/questions/996505/lru-cache-implementation-in-javascript
// ref: https://leetcode.com/problems/lru-cache/discuss/1768749/LRU-Queue-Events-must-be-unique-by-key
// var LRUCache = function(capacity) {
//     this.max = capacity;
//     this.cache = new Map();
// };
// LRUCache.prototype.get = function(key) {
//         let item = this.cache.get(key);
//         if (item) {
//             // refresh key
//             this.cache.delete(key);
//             this.cache.set(key, item);
//         }
//         return item === undefined ? -1 : item;
// };
// LRUCache.prototype.first = function() {
//     return this.cache.keys().next().value;
// };
// LRUCache.prototype.put = function(key, val) {
//         // refresh key
//         if (this.cache.has(key)) this.cache.delete(key);
//         // evict oldest
//         else if (this.cache.size >= this.max) this.cache.delete(this.first());
//         this.cache.set(key, val);
// };
