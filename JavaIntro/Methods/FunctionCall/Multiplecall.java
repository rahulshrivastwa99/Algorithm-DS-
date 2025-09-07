package JavaIntro.Methods.FunctionCall;

public class Multiplecall {
  public static void rahul() {
    yashika();
    System.out.println("Rahul");
    karan();
  }

  public static void yashika() {
    System.out.println("yashika");
    karan();
  }

  public static void karan() {
    dhruv();
    System.out.println(" karan");
      }

  public static void dhruv() {
    System.out.println(" dhruv");
  }

  public static void main(String[] args) {
    rahul();
  }
}
