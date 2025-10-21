package DSA.Arrays;

public class practise {
  public static void main(String[] args) {
    int arr[] = { 1, 2, 3, 5, -9, -8, 22, -7 };

    for (int i = 0; i < arr.length; i++)
      if (arr[i] < 0)
        System.out.println(arr[i]);

  }
}
