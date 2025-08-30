package JavaIntro.Basic;

public class Typecasting {
  public static void main(String[] args) {

    // character to integer typecasting
    char ch = 'A'; // Explicit typecasting from char to int
    int ascii = (int) ch; // Explicit typecasting from char to int
    System.out.println(ascii);

    // integer to character typecasting
    int num = 65; // ASCII value of 'A'
    char character = (char) num; // Explicit typecasting from int to char
    System.out.println(character);
  }

}
