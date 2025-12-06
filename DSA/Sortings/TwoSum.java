package DSA.Sortings;

import java.util.Arrays;

public class TwoSum {

  public static void main(String[] args) {
    int[] arr = { 2, 1, 5, 4, 19, 8, 7, 13, 21 };
    int target = 9;
    int n = arr.length;
    Arrays.sort(arr); // Sorting the array first
    int left = 0, right = n - 1;
    while (left < right) {
      int sum = arr[left] + arr[right];
      if (sum == target) {
        System.out.println("Pair found: (" + arr[left] + ", " + arr[right] + ")");
        left++;
        right--;
      } else if (sum > target) {
        right--;
      } else {
        left++;
      }
    }

  }
}
