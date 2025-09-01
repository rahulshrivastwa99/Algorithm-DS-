package JavaIntro.Loops;

import java.util.Scanner;

public class GpExample {
  public static void main(String[] args) {
    int a = 2; // First term
    int r = 2; // Common ratio
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter number of terms:");
    int n = sc.nextInt(); // Number of terms

    System.out.print("Geometric Progression:");
    // genrate through built in function
    // for (int i = 0; i < n; i++) {
    // int term = a * (int) Math.pow(r, i);
    // System.out.print(term + " ");
    // }

    for (int i = 0; i < n; i++) {
      System.out.print(a + " ");
      a = a * r;
    }
    sc.close();
  }
}