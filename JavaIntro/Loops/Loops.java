package JavaIntro.Loops;

public class Loops {
  public static void main(String[] args) {
    for (int i = 1; i <= 200; ++i) {
      if (i % 17 == 0)
        System.out.println("Iteration: " + i);
    }
  }
}