package JavaIntro.Methods.Math_fx;

import java.util.Scanner;

public class Maxof4num {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter 4 numbers: ");
    int a = sc.nextInt();
    int b = sc.nextInt();
    int c = sc.nextInt();
    int d = sc.nextInt();
    int max = Math.max(Math.max(a, b), Math.max(d, c));
    System.out.println("The maximum number is: " + max);
    sc.close();
  }

}
