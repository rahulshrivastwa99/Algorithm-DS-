package DSA.Arrays;

import java.util.Random;

public class random {
  public static void main(String[] args) {
    int n = 5; // size of the array
    int[] arr = new int[n];

    Random random = new Random();

    // Fill array with random values between 0 and 99
    for (int i = 0; i < n; i++) {
      arr[i] = random.nextInt(100); // random numbers from 0 to 99
    }
    for (int i = 0; i < arr.length; i++)
      System.out.println("Array filled with" + "  " + arr[i]);
  }

}
