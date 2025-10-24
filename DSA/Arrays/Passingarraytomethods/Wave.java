package DSA.Arrays.Passingarraytomethods;

public class Wave {
  public static void main(String[] args) {
    /*
     * Input: arr[] = [1, 2, 3, 4, 5]
     * Output: [2, 1, 4, 3, 5]
     * Explanation: Array elements after sorting it in the waveform are 2, 1, 4, 3,
     * 5.
     * 
     * 
     * Input: arr[] = [2, 4, 7, 8, 9, 10]
     * Output: [4, 2, 8, 7, 10, 9]
     * Explanation: Array elements after sorting it in the waveform are 4, 2, 8, 7,
     * 10, 9
     */
    int[] arr = { 2, 4, 7, 8, 9, 10 };
    // int slow = 0;
    // int fast = 1;
    System.out.print("Original Array: ");
    for (int value : arr) {
      System.out.print(value + " ");
    }
    System.out.println();

    for (int i = 0; i < arr.length - 1; i += 2) {
      int temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
    }
    // while (fast < arr.length) {
    // int temp = arr[slow];
    // arr[slow] = arr[fast];
    // arr[fast] = temp;

    // slow += 2;
    // fast += 2;

    // }
    System.out.print("After Changing Array: ");

    for (int value : arr) {
      System.out.print(value + " ");
    }

  }
}