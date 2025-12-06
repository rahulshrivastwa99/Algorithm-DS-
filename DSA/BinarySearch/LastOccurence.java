package DSA.BinarySearch;

public class LastOccurence {
  public static void main(String[] args) {
    int arr[] = { 1, 2, 2, 2, 3, 4, 5 };
    int target = 2;
    int result = -1;
    int i = 0, j = arr.length - 1;
    while (i <= j) {
      int mid = i + (j - i) / 2;
      if (arr[mid] == target) {
        result = mid;
        i = mid + 1; // Move to the right half to find the Last occurrence
      } else if (arr[mid] < target) {
        i = mid + 1;
      } else {
        j = mid - 1;
      }
    }
    if (result != -1) {
      System.out.println("Last Occurrence of " + target + " is at Index: " + result);
    } else {
      System.out.println("Element Not Found");
    }
  }
}
