package DSA.Arrays2D;

public class ForEachLoop {
  public static void main(String[] args) {
    int[][] arr = {
        { 1, 2, 3, 4 },
        { 5, 6, 7, 8 },
        { 9, 10, 11, 12 }
    };

    System.out.println("Printing 2D array in column-wise manner");
    for (int[] a : arr) {
      for (int element : a) {
        System.out.print(element + " ");
      }

    }
  }
}
