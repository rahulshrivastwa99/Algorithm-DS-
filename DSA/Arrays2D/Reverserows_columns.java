package DSA.Arrays2D;

public class Reverserows_columns {
  public static void main(String[] args) {
    int[][] arr = {
        { 1, 2, 3, 4 },
        { 5, 6, 7, 8 },
        { 9, 10, 11, 12 }
    };
    System.out.println();
    System.out.println("Printing 2D array in row-wise manner");
    for (int i = 0; i < arr.length; i++) {
      for (int j = arr[i].length - 1; j >= 0; j--) {
        System.out.print(arr[i][j] + " ");
      }
      /**
       * op will be
       * 4 3 2 1
       * 8 7 6 5
       * 12 11 10 9
       */
      System.out.println();
    }
    System.out.println("Printing 2D array in column-wise manner");
    for (int j = 0; j < arr[0].length; j++) {
      for (int i = arr.length - 1; i >= 0; i--) {
        System.out.print(arr[i][j] + " ");
      }
      /*
       * op will be
       * 12 11 10 9
       * 8 7 6 5
       * 4 3 2 1
       */
      System.out.println();
    }
  }
}
