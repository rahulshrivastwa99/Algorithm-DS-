package DSA.Sortings;

public class InsertionSort {
  public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
      int j = i;
      while (j > 0 && arr[j - 1] > arr[j]) {
        // swap arr[j] and arr[j-1]
        int temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
        j--;
      }
      // int key = arr[i];
      // int j = i - 1;

      // // Move elements of arr[0..i-1], that are greater than key,
      // // to one position ahead of their current position
      // while (j >= 0 && arr[j] > key) {
      // arr[j + 1] = arr[j];
      // j = j - 1;
      // }
      // arr[j + 1] = key;
    }
  }

  public static void main(String[] args) {
    int[] arr = { 12, 11, 13, 5, 6 };
    insertionSort(arr);
    System.out.println("Sorted array:");
    for (int num : arr) {
      System.out.print(num + " ");
    }
  }
}
