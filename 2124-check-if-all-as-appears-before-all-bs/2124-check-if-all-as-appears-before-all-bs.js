/**
 * @param {string} s
 * @return {boolean}
 */
var checkString = function(s) {
    let hasEncounteredB = false;

    for (const letter of s) {
        if (letter === 'b') {
            hasEncounteredB = true;
        } else if (letter === 'a') {
            if (hasEncounteredB) return false;
        }
    }

    return true;
};