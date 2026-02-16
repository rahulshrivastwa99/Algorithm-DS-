package DSA.Arrays2D;

public class TranposeofMatrix {
  public static void main(String[] args) {
    int[][] arr = {
        { 1, 2, 3, 4 },
        { 5, 6, 7, 8 },
        { 9, 10, 11, 12 }
    };
    int[][] transpose = new int[arr[0].length][arr.length];
    for (int i = 0; i < arr.length; i++) {
      for (int j = 0; j < arr[i].length; j++) {
        transpose[j][i] = arr[i][j];
      }
    }

    for (int i = 0; i < transpose.length; i++) {
      for (int j = 0; j < transpose[i].length; j++) {
        System.out.print(transpose[i][j] + " ");
      }
      System.out.println();
    }
  }
}
// package DSA.Arrays2D;

// public class TranposeofMatrix {
// public static void main(String[] args) {
// int[][] arr = {
// { 1, 2, 3 },
// { 4, 5, 6 },
// { 7, 8, 9 }
// };

// // Transpose using swap technique (only works for square matrices)
// for (int i = 0; i < arr.length; i++) {
// for (int j = i + 1; j < arr[i].length; j++) {
// int temp = arr[i][j];
// arr[i][j] = arr[j][i];
// arr[j][i] = temp;
// }
// }

// for (int i = 0; i < arr.length; i++) {
// for (int j = 0; j < arr[i].length; j++) {
// System.out.print(arr[i][j] + " ");
// }
// System.out.println();
// }

// }
// }