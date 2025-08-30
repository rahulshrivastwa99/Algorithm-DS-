package JavaIntro.IF_ELSE;

import java.util.Scanner;

public class Check4digit {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter a Number:");
    int num = sc.nextInt();
    if (num >= 1000 && num <= 9999) {
      System.out.println(num + " is a 4-digit number.");
    } else {
      System.out.println(num + " is not a 4-digit number.");
    }
    sc.close();
  }

}
