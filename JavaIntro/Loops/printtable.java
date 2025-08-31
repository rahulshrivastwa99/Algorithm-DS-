package JavaIntro.Loops;

import java.util.Scanner;

public class printtable {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter a number to print its table: ");
    int n = sc.nextInt();
    int i;
    // 1st approach
    // in this method we are iterating from 1 to 170 and checking if the number is
    // multiple of 17 or not
    // for (i = 1; i <= 170; i++)
    // if (i % 17 == 0)
    // System.out.println(n + " X " + (i / 17) + " = " + i);

    // // 2nd approach
    // for (i = 17; i <= 170; i = i + 17) {
    // System.out.println(n + " X " + (i / 17) + " = " + i);
    // }

    // 3rd approach
    // optimized approach
    for (i = 1; i <= 10; i++)
      System.out.println(n + " X " + i + " = " + n * i);
  }
}
