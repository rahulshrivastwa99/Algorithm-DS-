package DSA.Arrays.Passingarraytomethods;

public class Segregate01 {
  public static void main(String[] args) {
    int[] arr = { 1, 0, 1, 0, 1, 0, 0 };
    // Two Pointer Approach>>>>>>>>>>>>>
    int start = 0;
    int end = arr.length - 1;

    while (start < end) {
      if (arr[start] == 1 && arr[end] == 0) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
      }
      if (arr[start] == 0)
        start++;
      if (arr[end] == 1)
        end--;
    }

    for (int value : arr) {
      System.out.print(value + " ");
    }

    // Counting approach >>>>>>>>>>>
    // int zeros = 0;
    // int ones = 0;
    // for (int value : arr) {
    // if (value == 0)
    // zeros++;
    // else
    // ones++;
    // }
    // System.out.print("Numbers of 0s: " + zeros);
    // System.out.println();
    // System.out.print("Numbers of 1s: " + ones);
    // System.out.println();

    // for (int i = 0; i < arr.length; i++) {
    // if (i < zeros) {
    // arr[i] = 0; // pehle zeros bhar do
    // } else {
    // arr[i] = 1; // baad me ones bhar do
    // }
    // }

    // // Step 3: Print final segregated array
    // System.out.print("Segregated array: ");
    // for (int value : arr) {
    // System.out.print(value + " ");
    // }

  }
}
