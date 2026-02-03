public class BuiltinString {

  public static int compareTo(String x, String y) {
    int len1 = x.length();
    int len2 = y.length();
    int minLen = Math.min(len1, len2);
    for (int i = 0; i < minLen; i++) {
      char ch1 = x.charAt(i);
      char ch2 = y.charAt(i);
      if (ch1 != ch2) {
        return ch1 - ch2;
      }
    }
    if (len1 != len2) {
      return len1 - len2;
    }
    return -1;
  }

  public static void main(String[] args) {

    // Code Here
    String x = "zarshita";
    String y = "aarsh";
    System.out.println(compareTo(x, y));

    System.out.println("================ Built-in String Methods ================");

    // Base strings
    String s = "  harshita  ";
    String s2 = "Harshita";
    String s3 = "harsh";

    // 1️⃣ length() → returns length of string
    System.out.println(s.length()); // includes spaces

    // 2️⃣ charAt(index) → returns character at given index
    System.out.println(s.charAt(2)); // r

    // 3️⃣ contains() → checks if substring exists
    System.out.println(s.contains("harsh")); // true

    // 4️⃣ startsWith() → checks starting characters
    System.out.println(s.startsWith("  ha")); // true

    // 5️⃣ endsWith() → checks ending characters
    System.out.println(s.endsWith("  ")); // true

    // 6️⃣ toUpperCase() → converts to uppercase
    System.out.println(s.toUpperCase());

    // 7️⃣ toLowerCase() → converts to lowercase
    System.out.println(s2.toLowerCase());

    // 8️⃣ trim() → removes leading & trailing spaces
    System.out.println(s.trim()); // harshita

    // 9️⃣ equals() → compares content (case-sensitive)
    System.out.println(s2.equals("Harshita")); // true

    // 🔟 equalsIgnoreCase() → ignores case
    System.out.println(s2.equalsIgnoreCase("harshita")); // true

    // 1️⃣1️⃣ compareTo() → lexicographical comparison
    System.out.println(s3.compareTo("harsh")); // 0

    // Extra compareTo examples
    String a = "apple";
    String b = "banana";
    System.out.println(a.compareTo(b)); // negative
    System.out.println(b.compareTo(a)); // positive

    // 1️⃣2️⃣ substring(beginIndex)
    System.out.println(s.trim().substring(2)); // rshita

    // 1️⃣3️⃣ substring(beginIndex, endIndex)
    System.out.println(s.trim().substring(0, 5)); // harsh

    // 1️⃣4️⃣ indexOf() → first occurrence
    System.out.println(s.indexOf('a')); // index

    // indexOf() examples
    String s4 = "harshita";
    System.out.println(s4.indexOf("shi")); // 3
    System.out.println(s4.indexOf('z')); // -1

    // 1️⃣5️⃣ lastIndexOf() → last occurrence
    System.out.println(s.lastIndexOf('a'));

    // 1️⃣6️⃣ replace() → replace characters
    System.out.println(s.replace('a', 'o'));

    // 1️⃣7️⃣ split() → splits string into array
    String data = "java,python,c++";
    String[] arr = data.split(",");

    for (String lang : arr) {
      System.out.println(lang);
    }

    // 1️⃣8️⃣ isEmpty() → checks empty string
    String empty = "";
    System.out.println(empty.isEmpty()); // true

    // 1️⃣9️⃣ concat() → joins strings
    System.out.println(s3.concat("ita")); // harshita

    // concat example
    String firstName = "Harsh";
    String lastName = "ita";
    System.out.println(firstName.concat(lastName)); // Harshita

    // 2️⃣0️⃣ valueOf() → converts other types to string
    int num = 10;
    String numStr = String.valueOf(num);
    System.out.println(numStr + 20); // 1020
  }
}
