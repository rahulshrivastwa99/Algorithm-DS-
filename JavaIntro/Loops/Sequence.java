package JavaIntro.Loops;

import java.util.Scanner;

public class Sequence {

  public static void main(String[] args) {

    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();

    for (int i = 1; i <= n; i++) {
      System.out.print(i + " ");
      System.out.print((n + 1 - i) + " ");
    }
  }
}
