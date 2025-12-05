package DSA.Sortings;

public class SelectionSort {

  public static void selectionSort(int[] arr) {
    int n = arr.length;
    // By Finding minimum element and swapping it to the front
    // // Traverse through all array elements
    // for (int i = 0; i < n - 1; i++) {
    // // Find the minimum element in unsorted array
    // int minIdx = i;;
    // for (int j = i + 1; j < n; j++) {
    // if (arr[j] < arr[minIdx]) {
    // minIdx = j;
    // }
    // }

    // // Swap the found minimum element with the first element
    // int temp = arr[minIdx];
    // arr[minIdx] = arr[i];
    // arr[i] = temp;
    // }

    // By Finding maximum element and swapping it to the end
    for (int i = n - 1; i > 0; i--) {
      int maxIdx = i;

      // find largest element from 0 to i
      for (int j = 0; j < i; j++) {
        if (arr[j] > arr[maxIdx]) {
          maxIdx = j;
        }
      }

      // swap largest with arr[i]
      int temp = arr[maxIdx];
      arr[maxIdx] = arr[i];
      arr[i] = temp;
    }
  }

  public static void main(String[] args) {
    int arr[] = { 64, 25, 12, 22, 11 };
    selectionSort(arr);
    System.out.println("Sorted array:");

    for (int num : arr) {
      System.out.print(num + " ");
    }

  }
}
