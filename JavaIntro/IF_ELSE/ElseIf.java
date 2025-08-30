package JavaIntro.IF_ELSE;

import java.util.Scanner;

public class ElseIf {

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter the Number:");
    int num = sc.nextInt();
    if (num % 2 == 0 && num % 3 != 0)
      System.out.print("The number is divisible by 2");
    else if (num % 2 != 0 && num % 3 == 0)
      System.out.print("The number is divisible by 3");
    else if (num % 2 == 0 && num % 3 == 0)
      System.out.print("The number is divisible by 2 and 3");
    else
      System.out.print("The number is not divisible by 2, 3");
    sc.close();
  }
}
