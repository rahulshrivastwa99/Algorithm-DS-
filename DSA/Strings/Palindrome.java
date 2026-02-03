import java.util.Scanner;

public class Palindrome {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    System.out.print("Enter a string: ");
    String str = sc.nextLine();

    int i = 0;
    int j = str.length() - 1;
    boolean isPalindrome = true;

    while (i < j) {
      if (str.charAt(i) != str.charAt(j)) {
        isPalindrome = false;
        break;
      }
      i++;
      j--;
    }

    if (isPalindrome) {
      System.out.println("Palindrome");
    } else {
      System.out.println("Not a Palindrome");
    }

    sc.close();
  }
}

// import java.util.Scanner;

// public class Palindrome {
// public static void main(String[] args) {

// Scanner sc = new Scanner(System.in);

// // Manual array
// String[] str = { "apple", "banana", "mango", "grapes", "madam", "level" };

// for (int k = 0; k < str.length; k++) {

// String word = str[k];
// int i = 0;
// int j = word.length() - 1;
// boolean isPalindrome = true;

// while (i < j) {
// if (word.charAt(i) != word.charAt(j)) {
// isPalindrome = false;
// break;
// }
// i++;
// j--;
// }

// if (isPalindrome) {
// System.out.println(word + " → Palindrome");
// } else {
// System.out.println(word + " → Not a Palindrome");
// }
// }

// // Scanner logic kept (can be used later)
// // String input = sc.nextLine();

// sc.close();
// }
// }
