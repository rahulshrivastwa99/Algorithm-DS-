package DSA.Arrays2D;

public class Max {
  public static void main(String[] args) {
    // int[][] arr = new int[3][4];
    int[][] arr = {
        { 1, 2, 3, 4 },
        { 5, 6, 93, 8 },
        { 9, 10, 11, 12 }
    };
    int max = 0;
    for (int i = 0; i < arr.length; i++) {
      for (int j = 0; j < arr[i].length; j++) {
        if (arr[i][j] > max) {
          max = arr[i][j];
        }
      }
      System.out.println(max);
    }
  }
}
