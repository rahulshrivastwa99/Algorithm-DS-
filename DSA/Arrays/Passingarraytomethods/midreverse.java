package DSA.Arrays.Passingarraytomethods;

public class midreverse {
  public static void main(String[] args) {
    int[] arr = { 1, 43, 2, 3, 45, 6, 6, 78 };

    // // Print array in original order
    for (int i = 0; i < arr.length; i++) {
      System.out.print(arr[i] + " ");
    }
    System.out.println();

    int i = 1;
    int j = 6;
    int temp;
    while (i < j) {
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
      j--;
    }

    for (int ele : arr) {
      System.out.print(ele + " ");
    }
  }
}
