# 🎯 Mission Placement 2026 | Study Vault

> **Goal:** 3-5 Months Consistency
> **Partners:** [Rahul] & [Partner Name]

---

## 📊 DSA Question Tracker

| Status   | Topic       | Problem Name      | Link                                                           | Difficulty | Logic / Approach (Essay)                                      | Partner |
| :------- | :---------- | :---------------- | :------------------------------------------------------------- | :--------- | :------------------------------------------------------------ | :------ |
| 🟢 Done  | Array       | Two Sum           | [LeetCode](https://leetcode.com/problems/two-sum/)             | Easy       | Used HashMap to store index and complement. Time: O(n).       | ✅      |
| 🟡 Doing | Linked List | Reverse LL        | [LeetCode](https://leetcode.com/problems/reverse-linked-list/) | Medium     | Pointers approach (prev, curr, next). Needs careful swapping. | ❌      |
| 🔴 Todo  | Tree        | Inorder Traversal | [GFG](https://www.geeksforgeeks.org/)                          | Easy       | Left -> Root -> Right (Recursive approach).                   | ❌      |

---

## 💻 Code Snippet (VS Code Style)

### Problem: Reverse Linked List

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 * int val;
 * ListNode next;
 * ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}
```
