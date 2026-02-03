public class SubString {
  public static void main(String[] args) {
    String str = "Hello, welcome to the world of Java programming!";
    int start = 7;
    int end = 14;

    // Extracting substring
    String subStr = str.substring(start, end);

    System.out.println("Original String: " + str);
    System.out.println("Substring from index " + start + " to " + end + ": " + subStr);
  }
}
