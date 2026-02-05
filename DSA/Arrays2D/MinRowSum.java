package DSA.Arrays2D;

public class MinRowSum {
  public static void main(String[] args) {

    int[][] arr = {
        { 1, 31, 1, 1 },
        { 2, 2, 2, 2 },
        { 1, 2, 31, 2 }
    };

    int minSum = Integer.MAX_VALUE;
    int minRow = -1;

    for (int i = 0; i < arr.length; i++) {
      int sum = 0;

      for (int j = 0; j < arr[i].length; j++) {
        sum += arr[i][j];
      }

      if (sum < minSum) {
        minSum = sum;
        minRow = i;
      }
    }

    System.out.println("Minimum row sum is " + minSum + " at row " + minRow);
  }
}
