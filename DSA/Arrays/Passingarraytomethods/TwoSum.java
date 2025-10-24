package DSA.Arrays.Passingarraytomethods;

public class TwoSum {
  public static void main(String[] args) {

    // Nested Loop Approach
    int[] arr = { 1, 23, 43, 56, -9 };
    int target = 34;
    boolean flag = false; // to track if pair found

    outer: // label to break nested loops
    for (int i = 0; i < arr.length; i++) {
      for (int j = i + 1; j < arr.length; j++) { // j = i+1 to avoid duplicates // and
        // self-pair
        if (arr[i] + arr[j] == target) {
          System.out.println("Target found at indices " + i + " and " + j);
          flag = true;
          break outer; // break both loops
        }
      }
    }

    if (!flag) {
      System.out.println("No pair found with target sum.");
    }

  }
}
