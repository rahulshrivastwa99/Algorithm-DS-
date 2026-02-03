import java.util.Scanner;

public class Vowels {
  public static void main(String[] args) {
    Scanner str = new Scanner(System.in);
    System.out.print("Enter a string: ");
    String sc = str.nextLine();
    int count = 0;
    for (int i = 0; i < sc.length(); i++) {
      char ch = sc.charAt(i);

      if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
        count++;
      }
    }
    System.out.println(count);
  }
}
