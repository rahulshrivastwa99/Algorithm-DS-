package JavaIntro.Loops.While;

import java.util.Scanner;

public class Sum_Reverse {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter a Number:");
    int n = sc.nextInt();
    sc.close();
    int rev = 0;
    int sum = 0;

    while (n != 0) {
      sum += n % 10;
      rev = rev * 10 + n % 10;
      n /= 10;
    }
    System.out.println("Sum of the Number:" + (sum > 0 ? sum : -sum));
    System.out.println("Reverse of Number " + rev);
  }

}
