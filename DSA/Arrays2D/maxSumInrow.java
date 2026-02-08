package DSA.Arrays2D;

public class maxSumInrow {
  public static void main(String[] args) {

    // 2D array (matrix) declaration and initialization
    int[][] arr = {
        { 1, 2, 3, 4 },
        { 5, 6, 93, 8 },
        { 9, 10, 11, 12 }
    };

    // maxSum ko sabse chhoti possible value se initialize kiya
    // taaki first row ka sum definitely isse bada ho
    int maxSum = Integer.MIN_VALUE;

    // maxRow us row ka index store karega jiska sum maximum hoga
    int maxRow = -1;

    // Outer loop: har row ke liye chalega
    for (int i = 0; i < arr.length; i++) {

      // Har row ke liye sum ko 0 se start karte hain
      int sum = 0;

      // Inner loop: current row ke saare elements add karega
      for (int j = 0; j < arr[1].length; j++) {
        sum += arr[i][j];
      }

      // Agar current row ka sum ab tak ke maxSum se bada hai
      if (sum > maxSum) {

        // maxSum update karo
        maxSum = sum;

        // maxRow update karo (current row index)
        maxRow = i;
      }
    }
//Github Streakkkk
    // Final result print
    System.out.println(
        "Max sum in a row is " + maxSum + " and the row is " + maxRow);

    System.out.println(maxSum + " " + maxRow);
  }
}
