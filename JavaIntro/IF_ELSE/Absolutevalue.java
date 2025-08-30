package JavaIntro.IF_ELSE;

import java.util.Scanner;

public class Absolutevalue {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter the Number:");
    int num = sc.nextInt();
    if (num < 0)
      num = -num;
    System.out.println("The absolute value is: " + num);
    sc.close();
  }
}
