package DSA.BinarySearch;

public class LinearSearch {
  public static void main(String[] args) {
    int arr[] = { 23, 45, 12, 67, 34, 89, 90 };
    int target = 90;
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] == target) {
        System.out.println("Target Found at Index: " + i);
        System.out.println("Target is: " + arr[i]);
      }
    }
  }
}
