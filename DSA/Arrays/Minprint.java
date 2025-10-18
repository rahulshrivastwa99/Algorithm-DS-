package DSA.Arrays;

public class Minprint {

  public static void main(String[] args) {
    int[] arr = { -90, 1, 2, 3, 77, 4, 5, 6, 7, 8, 9 };
    int min = Integer.MAX_VALUE;
    // int min = arr[0]; or you can use this also
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
      }
    }
    System.out.println(min);
  }
}
