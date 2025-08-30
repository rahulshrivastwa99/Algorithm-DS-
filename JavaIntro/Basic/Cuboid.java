package JavaIntro.Basic;

import java.util.Scanner;

public class Cuboid {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter the length of the cuboid: ");
    double length = sc.nextDouble();
    System.out.print("Enter the width of the cuboid: ");
    double width = sc.nextDouble();
    System.out.print("Enter the height of the cuboid: ");
    double height = sc.nextDouble();
    double volume = length * width * height;
    System.out.println("The volume of the cuboid is: " + volume);
    sc.close();
  }
}
