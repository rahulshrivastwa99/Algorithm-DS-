package JavaIntro.Basic;

public class incrementdecrement {
  public static void main(String[] args) {
    int a = 10;
    System.out.println("Initial value of a: " + a);

    // Incrementing a by 1 using ++ operator
    a++;
    System.out.println("After incrementing by 1, a: " + a);

    // Decrementing a by 1 using -- operator
    a--;
    System.out.println("After decrementing by 1, a: " + a);

    // Using prefix increment
    int b = ++a; // a is incremented first, then assigned to b
    System.out.println("Using prefix increment, b: " + b + ", a: " + a);

    // Using postfix increment
    int c = a++; // c is assigned the value of a first, then a is incremented
    System.out.println("Using postfix increment, c: " + c + ", a: " + a);
  }
}
