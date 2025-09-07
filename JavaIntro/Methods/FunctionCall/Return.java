package JavaIntro.Methods.FunctionCall;

public class Return {

  public static int sum(int a, int b) { // int is return type
    return a + b; // return will work only in int type function
  }

  public static void main(String[] args) {
    System.out.println(sum(5, 8)); // we can print function call directly
    int c = sum(5, 8); // or we can store it in a variable
    System.out.println(c);
  }
}
