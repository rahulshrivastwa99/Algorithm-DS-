package JavaIntro.IF_ELSE;

import java.util.Scanner;

public class Ternary {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter the Number:");
    int num = sc.nextInt();

    System.out.println((num % 2 == 0) ? "The number is even" : "The number is odd");
    sc.close();
  }
}
