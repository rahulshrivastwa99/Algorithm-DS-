package JavaIntro.Patterns;

public class Solidalpha {
  public static void main(String[] args) {
    // Approach 1
    // int n = 5;
    // for (int i = 1; i <= n; i++) {
    // char ch = 'A';
    // for (int j = 1; j <= n; j++) {
    // System.out.print(ch + " ");
    // ch++;
    // }
    // System.out.println();
    // }

    // Approach 2
    // a b c d e
    // a b c d e
    // a b c d e
    // a b c d e
    // a b c d e
    int n = 1;
    for (int i = 1; i <= n; i++) {
      for (int j = 1; j <= n; j++) {
        System.out.print((char) (i + 96) + " ");
      }
      System.out.println();
    }
    // a b c d e
    // a b c d e / for this o/p change i to j in print statement
    // a b c d e
    // a b c d e
    // a b c d e
  }
}
