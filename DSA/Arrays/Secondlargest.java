package DSA.Arrays;

public class Secondlargest {
  public static void main(String[] args) {
    int[] arr = { 1, 2, 3, 4, 4, 5, 5 };
    int max = Integer.MIN_VALUE;
    int secondmax = max;

    for (int value : arr) {
      if (value > max) {
        secondmax = max;
        max = value;
      } else if (value < max && value > secondmax) {
        secondmax = value;
      }

    }
    System.out.println("Second largest is: " + secondmax);
  }
}
