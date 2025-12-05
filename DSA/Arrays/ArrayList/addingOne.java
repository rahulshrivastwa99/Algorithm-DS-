import java.util.*;

import java.util.ArrayList;

public class addingOne {
  public static void main(String[] args) {
    // Initialize input array representing a number, e.g. 1 2 9
    int[] input = { 1, 2, 9 };

    // Print the input array
    System.out.print("Input array: ");
    System.out.println(Arrays.toString(input));

    // Compute the output
    ArrayList<Integer> result = addOne(input);

    // Print the output array
    System.out.println("Output array: " + result);
  }

  // Method to add one to array-represented number
  public static ArrayList<Integer> addOne(int[] arr) {
    ArrayList<Integer> ans = new ArrayList<>();
    int carry = 1;

    for (int i = arr.length - 1; i >= 0; i--) {
      int sum = arr[i] + carry;
      ans.add(sum % 10);
      carry = sum / 10;
    }

    if (carry == 1)
      ans.add(1);

    Collections.reverse(ans);
    return ans;
  }
}
