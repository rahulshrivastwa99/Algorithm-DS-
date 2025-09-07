package JavaIntro.Methods.FunctionCall;

import java.util.Scanner;

public class Fx {
  static int a; // shared variable

  public static void fx() {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter a number: ");
    a = sc.nextInt(); // store user input in 'a'
    sc.close();
  }

  public static void main(String[] args) {
    fx(); // call fx() to take input

    System.out.println("Hello World, value is: " + a);
    System.out.println(a + 2); // use 'a' further
  }
}
