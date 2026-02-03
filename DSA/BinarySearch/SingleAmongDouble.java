package DSA.BinarySearch;

public class SingleAmongDouble {

  public static int UniqueElements(int[] arr, int n) {
    if (n == 1)
      return arr[0];
    if (arr[0] != arr[1])
      return arr[0];
    if (arr[n - 1] != arr[n - 2])
      return arr[n - 1];

    int i = 0, j = n - 1;
    while (i <= j) {
      int mid = i + (j - i) / 2;
      if (arr[mid] != arr[mid - 1] && arr[mid] != arr[mid + 1])
        return arr[mid];
      int first = mid, Second = mid;
      if (arr[mid] == arr[mid - 1])
        first = mid - 1;
      else
        Second = mid + 1;
      int leftCount = first - i;
      int rightCount = j - Second;
      if (leftCount % 2 == 0) {
        i = Second + 1;
      } else {
        j = first - 1;
      }

    }
    return -1;

  }

  public static void main(String[] args) {
    int arr[] = { 5, 5, 14, 14, 40, 40, 42, 42, 46, 46, 48, 48, 3 };
    int n = arr.length;
    int unique = UniqueElements(arr, n);
    System.out.println("The unique element is: " + unique);
  }
}
