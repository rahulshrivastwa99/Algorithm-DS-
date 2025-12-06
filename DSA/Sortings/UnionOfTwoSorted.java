package DSA.Sortings;

import java.util.ArrayList;

public class UnionOfTwoSorted {
  public static ArrayList<Integer> findUnion(int arr1[], int arr2[]) {

    ArrayList<Integer> union = new ArrayList<>();

    int i = 0, j = 0;
    int n1 = arr1.length, n2 = arr2.length;

    while (i < n1 && j < n2) {

      // If arr1[i] is smaller
      if (arr1[i] < arr2[j]) {
        addToUnion(union, arr1[i]);
        i++;
      }
      // If arr2[j] is smaller
      else if (arr2[j] < arr1[i]) {
        addToUnion(union, arr2[j]);
        j++;
      }
      // If both are equal
      else {
        addToUnion(union, arr1[i]);
        i++;
        j++;
      }
    }

    // Add remaining elements of arr1
    while (i < n1) {
      addToUnion(union, arr1[i]);
      i++;
    }

    // Add remaining elements of arr2
    while (j < n2) {
      addToUnion(union, arr2[j]);
      j++;
    }

    return union;
  }

  // only adds if not duplicate
  private static void addToUnion(ArrayList<Integer> union, int value) {
    if (union.size() == 0 || union.get(union.size() - 1) != value) {
      union.add(value);
    }
  }

  public static void main(String[] args) {
    int arr1[] = { 1, 2, 2, 3, 4 };
    int arr2[] = { 2, 3, 5, 6 };

    ArrayList<Integer> union = findUnion(arr1, arr2);

    System.out.println("Union of two sorted arrays: " + union);
  }
}
