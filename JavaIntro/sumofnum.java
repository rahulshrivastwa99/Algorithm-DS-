package JavaIntro;

import java.util.Scanner;

public class sumofnum {
  public static void main(String[] args) {
    Scanner value = new Scanner(System.in);
    System.out.print("Enter the first number: ");
    int num1 = value.nextInt();
    System.out.print("Enter the second number: ");
    int num2 = value.nextInt();
    int sum = num1 + num2;
    System.out.println("The sum of the two numbers is: " + sum);
  }
}
