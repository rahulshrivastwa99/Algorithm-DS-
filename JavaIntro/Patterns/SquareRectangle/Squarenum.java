package JavaIntro.Patterns;

public class Squarenum {
  public static void main(String[] args) {
    int n = 5;
    // 1 2 3 4 5
    // 1 2 3 4 5 // Output
    // 1 2 3 4 5
    // 1 2 3 4 5
    // 1 2 3 4 5
    for (int i = 1; i <= n; i++) {
      for (int j = 1; j <= n; j++) {
        System.out.print(j + " ");
      }
      System.out.println();
    }

    // 1 1 1 1 1
    // 2 2 2 2 2 // output
    // 3 3 3 3 3
    // 4 4 4 4 4
    // 5 5 5 5 5
    for (int i = 1; i <= n; i++) {
      for (int j = 1; j <= n; j++) {
        System.out.print(i + " ");
      }
      System.out.println();
    }
  }
}
