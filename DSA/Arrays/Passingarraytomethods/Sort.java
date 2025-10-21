package DSA.Arrays.Passingarraytomethods;

import java.util.Arrays;

public class Sort {

  public static void main(String[] args) {
    int[] arr = { -3, 12, 99, -75, 43, 23 };

    Arrays.sort(arr); // sorts the array in place
    System.out.println(Arrays.toString(arr)); // prints the sorted array
  }
}
