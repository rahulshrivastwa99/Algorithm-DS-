import java.util.Arrays;

public class Anagram {
  public static void main(String[] args) {
    String s1 = "listen";
    String s2 = "silent";

    // Step 1: Length check
    if (s1.length() != s2.length()) {
      System.out.println("Not Anagram");
      return;
    }

    // Step 2: Convert to char arrays
    char[] x = s1.toCharArray();
    char[] y = s2.toCharArray();

    // Step 3: Sort both arrays
    Arrays.sort(x);
    Arrays.sort(y);

    // Step 4: Compare characters
    for (int i = 0; i < x.length; i++) {
      if (x[i] != y[i]) {
        System.out.println("Not Anagram");
        return;
      }
    }

    // Step 5: If all matched
    System.out.println("Anagram");
  }
}
