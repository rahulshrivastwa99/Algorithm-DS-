package DSA.Arrays.Passingarraytomethods;

public class Rotate {
  public static void main(String[] args) {
    // int[] arr = { 1, 2, 3, 4, 5, 6 };
    // int d = 2; // Rotate left by 2 positions

    // System.out.println("Original array:");
    // for (int value : arr) {
    // System.out.print(value + " ");
    // }

    // int n = arr.length;
    // d = d % n; // in case d > n
    // int[] temp = new int[n];
    // int k = 0;

    // // Step 1: Copy elements from index d to n-1
    // for (int i = d; i < n; i++) {
    // temp[k++] = arr[i];
    // }

    // // Step 2: Copy first d elements to the end
    // for (int i = 0; i < d; i++) {
    // temp[k++] = arr[i];
    // }

    // // Step 3: Copy all elements back to arr[]
    // for (int i = 0; i < n; i++) {
    // arr[i] = temp[i];
    // }

    // // Print rotated array
    // System.out.println("\n\nRotated array:");
    // for (int value : arr) {
    // System.out.print(value + " ");
    // }

    // Second Approach
    int[] arr = { 1, 2, 3, 4, 5, 6, 7, 8 };
    int d = 3;
    System.out.println("Original Array:");
    printArray(arr);

    rotateLeft(arr, d);

    System.out.println("\nRotated Array:");
    printArray(arr);

  }

  // Rotate using reversal algorithm
  public static void rotateLeft(int[] arr, int d) {
    int n = arr.length;
    d = d % n; // handle d > n

    // // Step 1: Reverse first d elements
    // reverse(arr, 0, d - 1);

    // // Step 2: Reverse remaining elements
    // reverse(arr, d, n - 1);
    // // Step 3: Reverse entire array
    // reverse(arr, 0, n - 1);

    // Step 1: Reverse the entire array
    reverse(arr, 0, n - 1);

    // Step 2: Reverse the first (n - d) elements
    reverse(arr, 0, n - d - 1);

    // Step 3: Reverse the last d elements
    reverse(arr, n - d, n - 1);

  }

  // Helper function to reverse part of array
  public static void reverse(int[] arr, int start, int end) {
    while (start < end) {
      int temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
      start++;
      end--;
    }
  }
  // public static void reverse(int[] arr, int start, int end) {
  //   while (start < end) {
  //     int temp = arr[start];
  //     arr[start] = arr[end];
  //     arr[end] = temp;
  //     start++;
  //     end--;
  //   }
  // }

  // Helper function to print array
  public static void printArray(int[] arr) {
    for (int num : arr) {
      System.out.print(num + " ");
    }
    System.out.println();
  }
}
