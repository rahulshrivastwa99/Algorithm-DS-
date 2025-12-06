package DSA.BinarySearch;

public class FirstOccurence {
  public static void main(String[] args) {
    int arr[] = { 1, 2, 2, 2, 3, 4, 5 };
    int target = 2;
    int result = -1;
    int i = 0, j = arr.length - 1;
    while (i <= j) {
      int mid = i + (j - i) / 2;
      if (arr[mid] == target) {
        result = mid;
        j = mid - 1; // Move to the left half to find the first occurrence
      } else if (arr[mid] < target) {
        i = mid + 1;
      } else {
        j = mid - 1;
      }
    }
    if (result != -1) {
      System.out.println("First Occurrence of " + target + " is at Index: " + result);
    } else {
      System.out.println("Element Not Found");
    }
  }
}
