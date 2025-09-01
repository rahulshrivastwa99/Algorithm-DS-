package JavaIntro.Loops.While;

import java.util.Scanner;

public class ReverseofNum {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    // int n = 1234;
    // if (n < 0)
    // n = -n;
    int rev = 0;
    while (n != 0) {
      rev = rev * 10 + n % 10;
      n /= 10;

    }
    System.out.println(rev);
    // if (sum < 0)
    // sum = -sum;
    // System.out.println(sum);
    // sc.close();
  }
}
