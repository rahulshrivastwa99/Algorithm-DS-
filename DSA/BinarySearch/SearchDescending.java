package DSA.BinarySearch;

public class SearchDescending {
  public static void main(String[] args) {
    int arr[] = { 9, 2, 5, 3, 1 };
    int target = 5;
    int i = 0, j = arr.length - 1;
    int result = -1;
    while (i <= j) {
      int mid = i + (j - i) / 2;
      if (arr[mid] == target) {
        result = mid;
        break;
      } else if (arr[mid] < target) {
        j = mid - 1; // Move to the left half
      } else {
        i = mid + 1; // Move to the right half
      }
    }
    if (result != -1) {
      System.out.println("Element " + target + " found at Index: " + result);
    } else {
      System.out.println("Element Not Found");
    }
  }
}
