package JavaIntro.IF_ELSE;

import java.util.Scanner;

public class divisibleby5 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter the Number:");
    int num = sc.nextInt();
    if (num % 5 == 0)
      System.out.println("The number is divisible by 5");
    else
      System.out.println("The number is not divisible by 5");
    sc.close();
  }
}
