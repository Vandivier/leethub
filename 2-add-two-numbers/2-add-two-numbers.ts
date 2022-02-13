/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/*
* time complexity: O(n)
* mem complexity: constant memory O(n) [mutation pattern, in-place transform]
* note: arbitrarily in-place transform l1
*/ 
function addTwoNumbers(l1: ListNode, l2: ListNode): ListNode {
    let currList1 = l1;
    let currList2 = l2;
    const resultHead = new ListNode(0, null);
    let currResult = resultHead;
    let shouldCarry = false;

    while (currList1 || currList2) {
        const currL1Val = currList1 ? currList1.val : 0;
        const currL2Val = currList2 ? currList2.val : 0;
        let currVal = currL1Val + currL2Val + (shouldCarry ? 1 : 0);

        if (currVal >= 10) {
            shouldCarry = true;
            currVal -= 10;
        } else {
            shouldCarry = false;
        }

        currResult.val = currVal;
        currList1 = currList1 ? currList1.next : null;
        currList2 = currList2 ? currList2.next : null;

        if (currList1 || currList2) {
            currResult.next = new ListNode(0, null);
            currResult = currResult.next;
        }
    }

    if (shouldCarry) {
        currResult.next = new ListNode(1, null);
    }

    return resultHead;
};