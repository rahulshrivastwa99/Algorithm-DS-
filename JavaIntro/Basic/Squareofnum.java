package JavaIntro.Basic;

import java.util.Scanner;

public class Squareofnum {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter a number to find its square: ");
    double square = sc.nextDouble();
    System.out.println("The square of the number is: " + square * square);
    sc.close();

  }
}
