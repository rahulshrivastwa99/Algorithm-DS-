package DSA.Arrays;

import java.util.Scanner;

public class OutputInput {
  public static void main(String[] args) {
    // System.out.println("Rahul");
    // int[] arr = { 12, 34, 55, 67, 8, 90, 111 };
    // System.out.println(arr.length);
    // // for (int i = 0; i <= 5; i++) {
    // // System.out.println(i + " " + arr[i]);
    // // }
    // for (int i = 0; i <= arr.length - 1; i++) {
    // // System.out.println(arr[i]);
    // System.out.println(i + " " + arr[i]);
    // }
    // // alternate approach:-
    // for (int num : arr) {
    // System.out.println(num);
    // }

    // for taking input in an array
    Scanner sc = new Scanner(System.in);

    System.out.print("Enter the size of the array: ");
    int size = sc.nextInt();

    int[] list = new int[size];

    System.out.println("Enter " + size + " elements:");
    for (int i = 0; i < list.length; i++) {
      list[i] = sc.nextInt();
    }

    // Printing the array elements
    System.out.println("Array elements are:");
    for (int i = 0; i < list.length; i++) {
      System.out.println(i + " -> " + -1 * list[i]);
      System.out.println(i + " -> " + list[i]);
    }

    sc.close();
  }
}
