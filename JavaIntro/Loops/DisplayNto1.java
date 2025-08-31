package JavaIntro.Loops;

public class DisplayNto1 {
  public static void main(String[] args) {
    int n = 10;
    for (int i = n; i >= 1; i = i--) {
      System.out.print(i);
      System.out.print(" ");
    }
  }
}
