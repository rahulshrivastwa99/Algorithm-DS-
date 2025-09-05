package JavaIntro.Patterns;

public class Triangle {

  public static void main(String[] args) {
    int n = 5;
    for (int i = 1; i <= n; i++) {
      for (int j = 1; j <= i; j++) {
        System.out.print((char) (i + 64));
        // A
        // BB
        // CCC
        // DDDD
        // EEEEE
        // System.out.print((char) (j + 64));
        // System.out.print(i);

        // System.out.print(j);
      }
      System.out.println();
    }
  }
}
