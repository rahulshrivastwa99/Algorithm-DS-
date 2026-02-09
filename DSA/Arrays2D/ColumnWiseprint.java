package DSA.Arrays2D;

public class ColumnWiseprint {
  public static void main(String[] args) {
    int[][] arr = {
        { 1, 2, 3, 4 },
        { 5, 6, 7, 8 },
        { 9, 10, 11, 12 }
    };

    System.out.println("Printing 2D array in column-wise manner");
    for (int j = 0; j < arr[0].length; j++) {
      for (int i = 0; i < arr.length; i++) {
        System.out.print(arr[i][j] + " ");
      }
      System.out.println();
    }
  }
}
