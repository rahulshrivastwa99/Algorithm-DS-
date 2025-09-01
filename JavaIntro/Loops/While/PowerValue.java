package JavaIntro.Loops.While;

import java.util.Scanner;

public class PowerValue {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    // Input base and power
    int n = sc.nextInt(); // base
    int p = sc.nextInt(); // power
    sc.close();

    int result = 1;

    // Loop for power calculation
    while (p != 0) {
      result = result * n;
      p--;
    }

    // Print result
    System.out.println(result);
  }
}
