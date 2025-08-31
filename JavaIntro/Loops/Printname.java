package JavaIntro.Loops;

import java.util.Scanner;

public class Printname {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter your name: ");
    String name = sc.nextLine();
    System.out.print("How many times to print: ");
    int n = sc.nextInt();
    for (int i = 1; i <= n; i++) {
      System.out.println("Hello" + " " + name);
    }
  }
}
