package JavaIntro.Loops;

import java.util.Scanner;

public class ApExample {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter a number:");
    int n = sc.nextInt();
    int a = 2, b = 3;
    for (int i = 1; i <= n; i++) {
      System.out.print(a);
      a += b;
      System.out.println();
    }
    sc.close();

  }
}
