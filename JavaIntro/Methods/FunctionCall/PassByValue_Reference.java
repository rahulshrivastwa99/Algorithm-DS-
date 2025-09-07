package JavaIntro.Methods.FunctionCall;

public class PassByValue_Reference {
  public static void main(String[] args) {
    int x = 6;
    System.out.println("m" + x);
    // x = value(x);
    System.out.println("m" + x);
  }

  public static void value(int x) { // change the fx to int for getting overcome
    System.out.println(x);
    x = 10;
    System.out.println(x);
    // return x;

  }

}
