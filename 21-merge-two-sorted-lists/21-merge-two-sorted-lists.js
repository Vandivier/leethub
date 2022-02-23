/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    const resultHead = new ListNode(-Infinity)
    let builderPointer = resultHead;

    while (list1 && list2) {
        if (list1.val <= list2.val) {
            builderPointer.next = list1;
            list1 = list1.next;
        } else {
            builderPointer.next = list2;
            list2 = list2.next;
        }

        builderPointer = builderPointer.next;
    }

    // append remaining list's tail
    if (list1) {
        builderPointer.next = list1;
    } else {
        builderPointer.next = list2;
    }

    // TODO: maybe more readable to explicitly check list1 and 2 are null/empty
    // result.val === -Infinity ? null : result;
    return resultHead.next;
};