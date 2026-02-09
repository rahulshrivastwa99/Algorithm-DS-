package DSA.Arrays2D;

public class SnakeprintColumnwise {
  public static void main(String[] args) {
    int[][] arr = {
        { 1, 2, 3, 4 },
        { 5, 6, 7, 8 },
        { 9, 10, 11, 12 }
    };

    /*
     * op will be
     * 1 5 9
     * 2 6 10
     * 3 7 11
     * 4 8 12
     */

    System.out.println("Printing 2D array in Snakewise manner");
    for (int j = 0; j < arr[0].length; j++) {
      if (j % 2 == 0) {
        // Even index column: top to bottom
        for (int i = 0; i < arr.length; i++) {
          System.out.print(arr[i][j] + " ");
        }
      } else {
        // Odd index column: bottom to top
        for (int i = arr.length - 1; i >= 0; i--) {
          System.out.print(arr[i][j] + " ");
        }
      }
      System.out.println();
    }
  }
}
