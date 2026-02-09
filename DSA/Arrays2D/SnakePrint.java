package DSA.Arrays2D;

public class SnakePrint {
  public static void main(String[] args) {
    int[][] arr = {
        { 1, 2, 3, 4 },
        { 5, 6, 7, 8 },
        { 9, 10, 11, 12 }
    };

    System.out.println("Printing 2D array in Snakewise manner");
    for (int i = 0; i < arr.length; i++) {
      if (i % 2 == 0) {
        // Even index row: left to right
        for (int j = 0; j < arr[i].length; j++) {
          System.out.print(arr[i][j] + " ");
        }
      } else {
        // Odd index row: right to left
        for (int j = arr[i].length - 1; j >= 0; j--) {
          System.out.print(arr[i][j] + " ");
        }
      }
      System.out.println();
    }
  }
}
// output will be 1 2 3 4
// 8 7 6 5
// 9 10 11 12
