// const getProfit = (prices, left, right) => prices[right] - prices[left];

/**
 * @param {number[]} prices
 * @return {number}
 */
// var maxProfit = function(prices) {
//     let maxProfit = 0;

//     if (prices.length < 2) {
//         return maxProfit;
//     }

//     // TODO: maybe accumulate minimum buy and maximum sell
//     // -- maybe single-pass identify min buy at every index
//     // space/time: time is O(n) one-pass solution, memory/space: constant, just pointers
//     let leftIdx = 0;
//     let rightIdx = prices.length - 1; // init to max index

//     while (leftIdx < rightIdx) {
//         const currProfit = getProfit(prices, leftIdx, rightIdx);
//         maxProfit = Math.max(maxProfit, currProfit);

//         // modify indices
//         // pick better amongst two potential moves
//         // arbitrarily increment left in the case of a tie
//         const withIncrementLeft = getProfit(prices, leftIdx+1, rightIdx);
//         const withDecrementRight = getProfit(prices, leftIdx, rightIdx-1);
//         if (withDecrementRight > withIncrementLeft) {
//             rightIdx--;
//         } else {
//             leftIdx++;
//         }
//     }

//     return maxProfit;
// };

// a la mohy: 3, 6, 1, 8, 1, 100
// min buys: [3,3,1,1,1,1]
// min sells < dont do that
// var maxProfit = function(prices) {
//     if (prices.length < 2) {
//         return 0;
//     }

//     // secondary solution: 2-pass O(n) solution
//     // step 1: single-pass identify min buy at every index
//     // step 2: single-pass identify max sell + potential profit at every index, while caching maxProfit
//     // space/time: time is O(n) solution, memory/space: constant, just pointers
//     let currMinBuy = prices[0];
//     const minBuys = [currMinBuy];

//     for (let i = 1; i < prices.length; i++) {
//         currMinBuy = Math.min(currMinBuy, prices[i]);
//         minBuys.push(currMinBuy);
//     }
    
//     let maxProfit = 0;
    
//     for (let i = 0; i < prices.length; i++) {
//         const currPrice = prices[i];
//         maxProfit = Math.max(maxProfit, currPrice - minBuys[i])
//     }

//     return maxProfit;
// };


// a la mohy: 3, 6, 1, 8, 1, 100
// min buys: [3,3,1,1,1,1]
// min sells < dont do that
// var maxProfit = function(prices) {
//     if (prices.length < 2) {
//         return 0;
//     }

//     // secondary solution: 2-pass O(n) solution
//     // step 1: single-pass identify min buy at every index
//     // step 2: single-pass identify max sell + potential profit at every index, while caching maxProfit
//     // space/time: time is O(n) solution, memory/space: constant, just pointers
//     let currMinBuy = prices[0];
//     let maxProfit = 0;

//     // Mohy totally helped me cheat for this optimization
//     for (let i = 1; i < prices.length; i++) {
//         const currPrice = prices[i];
//         currMinBuy = Math.min(currMinBuy, currPrice);
//         maxProfit = Math.max(maxProfit, currPrice - currMinBuy)
//     }

//     return maxProfit;
// };

const maxProfit = prices => {
    // approach: greedy algorithm
    // conditional quick proof: suppose prices were sorted, subtract first and last,
    //    that would be optimal profit, if that equals my greedy algo output,
    //    then greedy produces correct soln everytm
    //
    // why not just sort prices, bc it breaks business rule about time
    let maxProfitFound = 0;
    let currMinBuy = prices[0]; // i can cache bc i can always buy in past, just not sell in past

    if (prices.length < 2) {
        return maxProfitFound;
    }

    for (let i = 1; i < prices.length; i++) {
        const currPrice = prices[i];
        currMinBuy = Math.min(currMinBuy, currPrice);
        maxProfitFound = Math.max(maxProfitFound, currPrice - currMinBuy);
    }

    return maxProfitFound;
}
