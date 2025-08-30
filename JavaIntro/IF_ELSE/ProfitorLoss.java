package JavaIntro.IF_ELSE;

import java.util.Scanner;

public class ProfitorLoss {

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter the Cost Price:");
    double cp = sc.nextDouble();
    System.out.print("Enter the Selling Price:");
    double sp = sc.nextDouble();
    if (sp > cp) {
      System.out.println("You made a Profit of: " + (sp - cp));
      System.out.println("Profit Percentage: " + ((sp - cp) / cp * 100) + "%");
    } else if (cp > sp) {
      System.out.println("You incurred a Loss of: " + (cp - sp));
      System.out.println("Loss Percentage: " + ((cp - sp) / cp * 100) + "%");
    } else {
      System.out.println("No Profit No Loss");
    }
    sc.close();
  }
}
