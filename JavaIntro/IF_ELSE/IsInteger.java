package JavaIntro.IF_ELSE;

import java.util.Scanner;

public class IsInteger {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter the Number:");
    double num = sc.nextDouble();

    // 1st Approach
    // if (num == (int) num)
    // System.out.println("The number is an Integer");
    // else
    // System.out.println("The number is not an Integer");
    // 2nd Approach
    if (num % 1 == 0)
      System.out.println("The number is an Integer");
    else
      System.out.println("The number is not an Integer");
    sc.close();
  }
}
