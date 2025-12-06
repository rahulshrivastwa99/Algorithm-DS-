package DSA.BinarySearch;

public class BinarySearch {

  public static boolean Sorting(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
      for (int j = 0; j < n - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          int temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return false;
  }

  public static int binarySearch(int[] arr, int target) {
    int i = 0, j = arr.length - 1;
    while (i <= j) {
      int mid = i + (j - i) / 2;
      if (arr[mid] == target) {
        return mid;
      } else if (arr[mid] < target) {
        i = mid + 1;
      } else {
        j = mid - 1;
      }

    }
    return -1;
  }

  public static void main(String[] args) {
    int arr[] = { 12, 11, 99, 34, 45, 67, 89, 90 };
    int target = 99;
    for (int num : arr) {
      System.out.print(num + " ");
    }
    Sorting(arr);
    System.out.println();
    for (int num : arr) {
      System.out.print(num + " ");
    }
    System.out.println();
    int result = binarySearch(arr, target);
    if (result == -1) {
      System.out.println("Element Not Found");
    } else {
      System.out.println("Element Found at Index: " + result);
    }
  }

}
