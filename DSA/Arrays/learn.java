package DSA.Arrays;

import java.util.Scanner;

public class learn {
  public static void main(String[] args) {
    int[] arr = new int[4];
    Scanner sc = new Scanner(System.in);

    for (int i = 0; i < arr.length; i++) {
      arr[i] = sc.nextInt();
      // System.out.println(arr[i]);
      // arr[i] = i;
      // i = arr[i];
      // System.out.println("after");
      // System.out.println(arr[i]);
    }

    for (int i = 0; i < arr.length; i++) {
      System.out.println(arr[i] * 2);
    }
    sc.close();
  }
}
