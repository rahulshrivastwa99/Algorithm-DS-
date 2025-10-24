package DSA.Arrays.ArrayList;

import java.util.ArrayList;
import java.util.Collections;

public class arrayList {

  public static void main(String[] args) {
    ArrayList<Integer> arr = new ArrayList<>();
    arr.add(25);
    arr.add(24);
    arr.add(23);
    arr.add(22);
    arr.add(21);
    arr.add(20);

    System.out.println(arr.get(2));
    arr.set(2, 32); // arr[2] = 32;
    System.out.println(arr.get(2));

    System.out.print("New method: ");
    System.out.println(arr);

    int n = arr.size();
    System.out.print("Regular method: ");
    for (int i = 0; i < n; i++) {
      System.out.print(arr.get(i) + " ");
    }
    System.out.println();
    System.out.print("ForEach: ");
    for (int value : arr)
      System.out.print(value + " ");
    System.out.println();

    // Reversing the arraylist using library module
    Collections.reverse(arr);
    System.out.print("Reversed array: " + arr);

    // reverse manullay
    for (int i = 0; i < arr.size() / 2; i++) {

      int temp = arr.get(i);
      arr.set(i, arr.get(n - i - 1));
      arr.set(n - i - 1, temp);

    }
    System.out.println();
    System.out.println("Reversed manullay: " + arr);
  }
}
