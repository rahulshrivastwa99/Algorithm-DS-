package DSA.Sortings;

import java.util.Arrays;

public class CommonElements {

  public static void main(String[] args) {
    int[] a = { 1, 2, 3, 4, 2, 5 };
    int[] b = { 2, 4, 6, 2, 8 };
    int n = a.length, m = b.length;
    Arrays.sort(a);
    Arrays.sort(b);
    int i = 0, j = 0;
    System.out.println("Common elements are: ");
    while (i < n && j < m) {
      if (a[i] == b[j]) {
        System.out.print(a[i] + " ");
        i++;
        j++;
      } else if (a[i] < b[j]) {
        i++;
      } else {
        j++;
      }
    }

  }
}
