package DSA.Arrays;

import java.util.Scanner;

public class chartype {

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    char[] arr = new char[4];
    for (int i = 0; i < arr.length; i++)
      // System.out.print(arr[i] + " ");
      arr[i] = sc.next().charAt(0);

    System.out.print("Characters entered: ");
    for (char c : arr) {
      System.out.print(c + " ");
    }
  }

}
