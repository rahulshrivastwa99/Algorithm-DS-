package JavaIntro.IF_ELSE;

import java.util.Scanner;

public class SideofTriangle {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter the Side1:");
    int a = sc.nextInt();
    System.out.print("Enter the Side2:");
    int b = sc.nextInt();
    System.out.print("Enter the Side3:");
    int c = sc.nextInt();
    if (a + b > c && b + c > a && a + c > b)
      System.out.print("The sides form a triangle");
    else
      System.out.print("The sides do not form a triangle");
    sc.close();

  }
}
