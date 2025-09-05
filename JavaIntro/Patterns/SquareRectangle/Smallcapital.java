package JavaIntro.Patterns;

import java.util.Scanner;

public class Smallcapital {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    // Take user input
    System.out.print("Enter number of rows: ");
    int rows = sc.nextInt();
    System.out.print("Enter number of columns: ");
    int cols = sc.nextInt();

    // Loop for rows
    for (int i = 0; i < rows; i++) {
      char ch;
      if (i % 2 == 0) {
        // even row → lowercase
        ch = (char) ('a' + i);
      } else {
        // odd row → uppercase
        ch = (char) ('A' + i);
      }

      // Loop for columns
      for (int j = 0; j < cols; j++) {
        System.out.print(ch);
      }
      System.out.println();
    }

    sc.close();
  }
}
