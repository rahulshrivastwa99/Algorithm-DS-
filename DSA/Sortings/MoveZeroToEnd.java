package DSA.Sortings;

public class MoveZeroToEnd {

  public static void moveZeroes(int[] arr) {
    int n = arr.length;
    // for (int i = 0; i < n - 1; i++) {
    // boolean swapped = false;
    // for (int j = 0; j < n - 1 - i; j++) {
    // if (arr[j] == 0) {
    // int temp = arr[j];
    // arr[j] = arr[j + 1];
    // arr[j + 1] = temp;
    // swapped = true;
    // }
    // }
    // if (!swapped) {
    // break;
    // }
    // }
    int j = 0; // pointer for non-zero position

    for (int i = 0; i < n; i++) {
      if (arr[i] != 0) {
        // Only swap when i != j
        if (i != j) {
          int temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
        j++; // increment only when non-zero placed
      }
    }
  }

  public static void main(String[] args) {
    int[] arr = { 0, 1, 0, 8, 9, 0, 6 };
    moveZeroes(arr);
    for (int num : arr) {
      System.out.print(num + " ");
    }

  }
}
