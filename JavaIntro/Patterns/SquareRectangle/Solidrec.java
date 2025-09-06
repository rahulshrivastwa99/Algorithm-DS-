package JavaIntro.Patterns.SquareRectangle;

import java.util.Scanner;

public class Solidrec {
  public static void main(String[] args) {
    int n = 4, m = 7;
    Scanner sc = new Scanner(System.in);
    n = sc.nextInt();
    m = sc.nextInt();
    sc.close();
    for (int i = 1; i <= n; i++) {
      for (int j = 1; j <= m; j++) {
        System.out.print("* ");
      }
      System.out.println();
    }
  }

}
