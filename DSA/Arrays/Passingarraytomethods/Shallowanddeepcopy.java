package DSA.Arrays.Passingarraytomethods;

public class Shallowanddeepcopy {
  public static void main(String[] args) {
    int[] arr = { 1, 2, 3, 45, 6, 56 };
    int[] x = arr; // x is shallow copy of arr < means x - arr hi hai>
    System.out.println(arr[0]);
    x[0] = 100;
    System.out.println(arr[0]);
    System.out.println(arr[1]);
  }
}
