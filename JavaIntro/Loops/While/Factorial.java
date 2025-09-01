package JavaIntro.Loops.While;

import java.util.Scanner;

public class Factorial {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    int fact = 1;
    while (n > 0) {
      fact = fact * n;
      n--;
    }
    System.out.println(fact);
  }
}
