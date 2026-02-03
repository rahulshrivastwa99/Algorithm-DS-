package DSA.BinarySearch;

public class FloorSorted {
  public static int floor(int arr[], int target) {
    int i = 0, j = arr.length - 1;
    int result = -1;
    while (i <= j) {
      int mid = i + (j - i) / 2;
      if (arr[mid] == target) {
        return arr[mid];
      } else if (arr[mid] < target) {
        result = arr[mid]; // Potential floor value
        i = mid + 1;
      } else {
        j = mid - 1;
      }
    }
    return result;
  }

  public static void main(String[] args) {
    int arr[] = { 1, 2, 4, 6, 10, 12, 14 };
    int target = 5;
    int floorValue = floor(arr, target);
    if (floorValue != -1) {
      System.out.println("Floor value of " + target + " is: " + floorValue);
    } else {
      System.out.println("No floor value found for " + target);
    }
  }
}
