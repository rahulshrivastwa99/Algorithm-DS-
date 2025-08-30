package JavaIntro.IF_ELSE;

import java.util.Scanner;

public class AreaorPerimeter {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter the Length:");
    double L = sc.nextDouble();
    System.out.print("Enter the Breadth:");
    double B = sc.nextDouble();
    double area = L * B;
    double perimeter = 2 * (L + B);
    if (area > perimeter)
      System.out.print("The Area is greater than Perimeter");
    else
      System.out.print("The Perimeter is greater than Area");
    sc.close();

  }
}
