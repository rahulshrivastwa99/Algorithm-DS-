package JavaIntro.IF_ELSE;

import java.util.Scanner;

public class BothDivisible {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter the Number:");
    int num = sc.nextInt();
    if (num % 5 == 0 || num % 3 == 0)
      System.out.print("The number is divisible by 5 or 3");
    else
      System.out.print("The number is not divisible by 5 or 3");
    sc.close();
  }

}
