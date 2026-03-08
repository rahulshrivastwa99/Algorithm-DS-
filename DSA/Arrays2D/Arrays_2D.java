// import java.util.Scanner;
package DSA.Arrays2D;

public class Arrays_2D {
  public static void main(String[] args) {
    // Scanner sc = new Scanner(System.in);
    int[][] arr = new int[3][4];
    System.out.println("No of rows " + arr.length);
    System.out.println("No of colums " + arr[0].length);
    for (int i = 0; i < arr.length; i++) {
      for (int j = 0; j < arr[i].length; j++) {
        // arr[i][j] = sc.nextInt();

        arr[i][j] = (i + 1) * (j + 1);
        System.out.print(arr[i][j] + " ");
      }
      System.out.println();
    }

    System.out.println("Printing 2D array in row-wise manner");

    for (int i = 0; i < arr.length; i++) {
      for (int j = 0; j < arr[i].length; j++) {
        System.out.print(arr[i][j] + " ");
      }
      System.out.println();
    }

    System.out.println("Printing 2D array in column-wise manner");
    for (int j = 0; j < arr[0].length; j++) {
      for (int i = 0; i < arr.length; i++) {
        System.out.print(arr[i][j] + " ");
      }
      System.out.println();
    }
    System.out.println("Sum of all elements in 2D array is");
    int sum = 0;
    for (int i = 0; i < arr.length; i++) {
      for (int j = 0; j < arr[i].length; j++) {
        // System.out.print(arr[i][j] + " ");
        sum += arr[i][j];
      }
      // System.out.println();
    }
    System.out.println("Sum of all elements in 2D array is " + sum);
  }
}
