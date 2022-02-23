//     def mergeTwoLists(self, l1, l2):
//         prehead = ListNode(-1)

//         prev = prehead
//         while l1 and l2:
//             if l1.val <= l2.val:
//                 prev.next = l1
//                 l1 = l1.next
//             else:
//                 prev.next = l2
//                 l2 = l2.next            
//             prev = prev.next

//         # At least one of l1 and l2 can still have nodes at this point, so connect
//         # the non-null list to the end of the merged list.
//         prev.next = l1 if l1 is not None else l2

//         return prehead.next



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
var mergeKLists = function(lists) {
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