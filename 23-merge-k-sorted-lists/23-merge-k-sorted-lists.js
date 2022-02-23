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
    // this is bullshit: can use bfs > dfs for no change in time complexity, but reduce mem complexity
    // target space complexity should be constant O(1)
    while (lists.length > 1) {
        // splice out array containing linkedList
        const toMerge = lists.splice(1, 1);
        const result = mergeSortTwoLists(lists[0], toMerge[0])
        lists[0] = result
    }

    return lists.length === 0 ? null : lists[0];
};

// this impl uses binary interval merge
var mergeKLists = function(lists) {
    // start by merging lists together one at a time
    // if we have time implement binary interval merge
    // we will want to make sure lists themselves are sorted by starting index
    // then use mergesort
    // repeat until a single list is left
    // this is bullshit: can use bfs > dfs for no change in time complexity, but reduce mem complexity
    // target space complexity should be constant O(1)
    let interval = 1;

    while (lists.length > interval) {
        // for (let i = 0; i < lists.length; i+=interval) {
        for (let i = 0; i < lists.length; i++) {
            const toMerge = lists.splice(i+1, 1);
            // lists[i] = mergeSortTwoLists(lists[i], lists[i+interval])
            const result = mergeSortTwoLists(lists[i], toMerge[0])
            lists[i] = result

            // // splice out array containing linkedList
            // const toMerge = lists.splice(i+interval, 1);
            // const result = mergeSortTwoLists(lists[i], toMerge[i])
            // lists[i] = result
            // // const result = mergeSortTwoLists(lists[i], lists[i+1])
            // // lists[i] = result
        }

        // interval *=2;
    }

    return lists.length === 0 ? null : lists[0] || null;
};