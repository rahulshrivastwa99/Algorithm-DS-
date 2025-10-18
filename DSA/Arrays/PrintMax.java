package DSA.Arrays;

public class PrintMax {

  public static void main(String[] args) {
    int[] arr = { -90, 1, 2, 3, 77, 4, 5, 6, 7, 8, 9 };
    int max = Integer.MIN_VALUE;
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] < max) {
        max = arr[i];
      }
    }
    System.out.println(max);
  }
}
