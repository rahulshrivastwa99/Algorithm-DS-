package DSA.Recursion;

import java.util.Scanner;

public class print1to5 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter the number:");
    int n = sc.nextInt();
    print(1, n);
    sc.close();

  }

  public static void print(int current, int end) {
    if (current > end) {
      return;
    }
    System.out.println(current);
    print(current + 1, end);
    int a = 10;

  }
}
