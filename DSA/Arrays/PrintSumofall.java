package DSA.Arrays;

import java.util.Scanner;

public class PrintSumofall {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter the size of array: ");
    int size = sc.nextInt();
    int arr[] = new int[size];
    // int[] arr = { 1, 2 };
    int sum = 0;
    System.out.print("Enter the elements of array: ");

    for (int i = 0; i < size; i++) {
      arr[i] = sc.nextInt();
    }
    System.out.print("Array Elements are: ");
    for (int value : arr) {
      System.out.print(value + " ");
    }
    System.out.println();

    for (int i = 0; i < arr.length; i++) {
      sum += arr[i];
    }

    System.out.println("Sum of the Array is :" + " " + sum);
    // sc.close();
  }
}
