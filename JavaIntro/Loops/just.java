package JavaIntro.Loops;

import java.util.Scanner;

public class just {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    int count = 0;
    for (; n > 0;) {
      n /= 10;
      count++;
    }
    System.out.println(count);
  }
}
