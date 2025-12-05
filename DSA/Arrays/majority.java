package DSA.Arrays;

public class majority {
  public static void main(String[] args) {
    int[] arr = { 1, 2, 1, 2, 3, 2, 2, 1, 3, 1, 5 };
    int ones = 0;
    int twos = 0;
    int threes = 0;
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] == 1)
        ones++;
      else if (arr[i] == 2)
        twos++;
      else
        threes++;

    }
    System.out.println(ones);
    System.out.println(twos);
    System.out.println(threes);
  }
}
