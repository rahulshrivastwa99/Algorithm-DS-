public class InterningNew {
  public static void main(String[] args) {
    String str1 = new String("hello");
    String str2 = new String("hello");

    // Without interning
    System.out.println("Without interning:");
    System.out.println("str1 == str2: " + (str1 == str2)); // false
    System.out.println("str1.equals(str2): " + str1.equals(str2)); // true

    // With interning
    String internedStr1 = str1.intern();
    String internedStr2 = str2.intern();

    System.out.println("\nWith interning:");
    System.out.println("internedStr1 == internedStr2: " + (internedStr1 == internedStr2)); // true
    System.out.println("internedStr1.equals(internedStr2): " + internedStr1.equals(internedStr2)); // true
  }
}