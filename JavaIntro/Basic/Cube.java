package JavaIntro.Basic;

import java.util.Scanner;

public class Cube {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter the side Length of the cube:");
    double side = sc.nextDouble();
    double LAS = 6 * side * side;
    double TAS = 4 * side * side;
    double volume = side * side * side;
    System.out.println("The Lateral Surface Area of the cube is: " + LAS);
    System.out.println("The Lateral Surface Area of the cube is: " + TAS);
    System.out.println("The Lateral Surface Area of the cube is: " + volume);
    sc.close();

  }
}
