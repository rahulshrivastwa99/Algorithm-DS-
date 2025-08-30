package JavaIntro.IF_ELSE;

import java.util.Scanner;

public class Magnitude {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter first number:");
    int num = sc.nextInt();
    num = -num;
    if (num < 69) {
      System.out.println("yes");
    } else {
      System.out.println("no");
    }
  }

}
