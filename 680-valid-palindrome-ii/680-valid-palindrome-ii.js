


/**
 * @param {string} s
 * @return {boolean}
 */

var validPalindromeAfterRemovingChar = function(s, left, right) {
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }

        left++
        right--
    }

    return true;
}

// TODO: try es6
var validPalindrome = function(s) {
    // two pointers approach
    let left = 0;
    let right = s.length - 1;
    
    // ordinary palindrome check
    while (left < right) {
        if (s[left] !== s[right]) {
            // you get one second chance
            return validPalindromeAfterRemovingChar(s, left+1, right)
                || validPalindromeAfterRemovingChar(s, left, right-1)
        }

        left++
        right--
    }

    return true;
};