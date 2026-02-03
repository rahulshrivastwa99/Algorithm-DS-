package DSA.BinarySearch;

public class PeakMountain {
  public static int findPeak(int[] arr) {
    int left = 0;
    int right = arr.length - 1;

    while (left < right) {
      int mid = left + (right - left) / 2;

      if (arr[mid] < arr[mid + 1]) {
        left = mid + 1; // Peak is in the right half
      } else {
        right = mid; // Peak is in the left half or at mid
      }
    }
    return left; // or right, both are same when left == right
  }

  public static void main(String[] args) {
    int arr[] = { 1, 3, 5, 7, 6, 4, 2 };
    int peakIndex = findPeak(arr);
    System.out.println("Peak Element is at Index: " + peakIndex + " with Value: " + arr[peakIndex]);
  }
}
