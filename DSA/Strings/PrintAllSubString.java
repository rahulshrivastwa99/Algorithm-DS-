import java.util.Scanner;

public class PrintAllSubString {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter a string: ");
    // System.out.println();
    String str = sc.nextLine();
    int n = str.length();
    int sum = 0;
    System.out.print("All substrings are:" + " ");
    for (int i = 0; i < n; i++) {
      for (int j = i + 1; j <= n; j++) {
        String sub = str.substring(i, j);
        System.out.print(sub + " ");
        int value = Integer.parseInt(sub);
        sum += value;
      }
    }
    System.out.println();
    System.out.println("Sum of all substrings: " + sum);
    int count = (n * (n + 1)) / 2;
    System.out.print("\nTotal number of substrings: " + count);

  }
}
