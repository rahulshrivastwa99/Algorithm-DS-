public class PrintAllSubString {
  public static void main(String[] args) {
    String str = "gopi";
    int n = str.length();

    System.out.println("  All substrings");
    for (int start = 0; start < n; start++) {

      for (int end = start + 1; end <= n; end++) {
        String subStr = str.substring(start, end);
        System.out.print(subStr + " ");
      }
    }
  }
}
