package DSA.Recursion;

public class print5to1 {
  public static void main(String[] args) {
    print(5);

  }

  public static void print(int n) {
    if (n == 1) {
      System.out.println(n);
      return;
    }
    System.out.println(n);
    print(n - 1);
    System.out.println(n);

  }
}
