package JavaIntro.Methods.FunctionCall;

public class Permutation_Combination {
  public static void main(String[] args) {
    int n = 5;
    int r = 4;
    int nCr = factorial(n) / (factorial(r) * factorial(n - r));
    System.out.println("Factorial of n:" + factorial(n));
    System.out.println("Factorial of r:" + factorial(r));
    System.out.println("Factorial of n-r:" + factorial(n - r));
    System.out.println("Factorial of nCr:" + nCr);
  }

  public static int factorial(int n) {
    int fact = 1;
    for (int i = 1; i <= n; i++) {
      fact = fact * i;
    }
    return fact;
  }

}
