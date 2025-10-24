package DSA.Arrays.Passingarraytomethods;

public class Reverse {
  public static void main(String[] args) {
    int[] arr = { 1, 43, 2, 3, 45, 6, 6, 78 };

    // // Print array in original order
    for (int i = 0; i < arr.length; i++) {
      System.out.print(arr[i] + " ");
    }
    System.out.println();

    // // Print array in reverse order
    // for (int i = arr.length - 1; i >= 0; i--) {
    // System.out.print(arr[i] + " ");
    // }

    // Using Two Pointer Approach>>>>>>>>>>>
    int i = 0;
    int j = arr.length - 1;
    int temp;
    while (i < j) {
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
      j--;
    }

    for (int k = 0; k < arr.length; k++) {
      System.out.print(arr[k] + " ");
    }

  }
}
