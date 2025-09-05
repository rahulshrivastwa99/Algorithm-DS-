package JavaIntro.Patterns;

public class AB1 {
  public static void main(String[] args) {
    int n = 5;
    for (int i = 1; i <= n; i++) {

      for (int j = 1; j <= n - i + 1; j++) { // can be done with j=1 to j<=n-i+1 <<Statndard template for such patterns
        // arranges no. in order>>
        System.out.print(j + " "); // can also done usinh j= n; j>=i; j--
      }
      System.out.println();
    }
  }

}
