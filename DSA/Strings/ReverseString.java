public class ReverseString {
  public static void main(String[] args) {
    String str = "HelloWorld";
    String reversedStr = "";

    // for (int i = str.length() - 1; i >= 0; i--) {
    // reversedStr += str.charAt(i);
    // }

    // System.out.println("Original String: " + str);
    // System.out.println("Reversed String: " + reversedStr);
    // StringBuilder sb = new StringBuilder("HelloWorld");
    // sb.reverse();
    // System.out.println("Reversed String using StringBuilder: " + sb.toString());

    // Two pointer approach
    int i = 0;
    int j = str.length() - 1;
    char[] charArray = str.toCharArray();
    while (i < j) {

      char temp = charArray[i];
      charArray[i] = charArray[j];
      charArray[j] = temp;
      i++;
      j--;
    }
    String reversed = new String(charArray);
    System.out.println("Reversed String using Two Pointer approach: " + reversed);
  }

}
