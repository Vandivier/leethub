const mergeSortTwoLists = (l1, l2) => {
    const head = new ListNode(-Infinity)
    let pointer = head;

    while (l1 && l2) {
        if (l1.val <= l2.val) {
            // or, pointer.next = new ListNode(l1.val);
            pointer.next = l1;
            l1 = l1.next;
        } else {
            pointer.next = l2;
            l2 = l2.next;
        }

        pointer = pointer.next;
    }

    // we could be at bottom of one list but not other
    if (l1) {
        pointer.next = l1;
    } else {
        pointer.next = l2;
    }

    return head.next
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKListsLinear = function(lists) {
    // start by merging lists together one at a time
    // if we have time implement binary interval merge
    // we will want to make sure lists themselves are sorted by starting index
    // then use mergesort
    // repeat until a single list is left
    // target space complexity should be constant O(1)

    while (lists.length > 1) {
        // splice out array containing linkedList
        const toMerge = lists.splice(1, 1);
        lists[0] = mergeSortTwoLists(lists[0], toMerge[0])
    }

    return lists[0] || null;
};

// for some reason, for loop wrapped in while is much faster than while loop alone?
var mergeKLists = function(lists) {
    // while (lists.length > 1) {
        for (let i = 0; i < lists.length; i++) {
            // const toMerge = lists.splice(i+1, 1);
            // lists[i] = mergeSortTwoLists(lists[i], toMerge[0])
            // const toMerge = lists.splice(i+1, 1);
            lists[0] = mergeSortTwoLists(lists[0], lists[i+1])
        }
    // }

    return lists[0] || null;
};

// binary interval merge / divide and conquer without splicing
// (similar to official python solution)
var mergeKListsIntervalMergeNoSplice = function(lists) {
// var mergeKLists = function(lists) {
    let interval = 1;

    while (lists.length > interval) {
        for (let i = 0; i < (lists.length - interval); i += (interval*2)) {
            lists[i] = mergeSortTwoLists(lists[i], lists[i+interval])
        }

        interval *=2;
    }

    return lists[0] || null;
};