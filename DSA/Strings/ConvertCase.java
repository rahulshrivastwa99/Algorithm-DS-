public class ConvertCase {
  public static void main(String[] args) {

    String s = "harShItA"; // try "harShItA" also

    // Safety check
    if (s.isEmpty()) {
      System.out.println("String is empty");
      return;
    }

    char firstChar = s.charAt(0);

    if (Character.isUpperCase(firstChar)) {
      s = s.toUpperCase();
    } else if (Character.isLowerCase(firstChar)) {
      s = s.toLowerCase();
    }

    System.out.println(s);
  }

}
