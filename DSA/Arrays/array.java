package DSA.Arrays;

public class array {
  public static void main(String[] args) {
    // for intialiazation of an array
    int[] arr = { 2, 3, 5, 56, 78, 99 };
    int arr1[] = { 14, 15, 12, 16, 19, 11 }; // ye tareeka se bhi kr skte h
    System.out.println(arr);
    // indexing
    System.out.println(arr[0]);
    System.out.println(arr[1]);
    System.out.println(arr[4]);
    System.out.print("Change in array: ");
    System.out.println(arr1[4]);

    for (int i = 0; i < arr.length; i++) {
      System.out.println(arr[i]);
    }
    // updtaing -- mutability
    arr[4] = 89;
    System.out.print("Change in index 4: ");
    System.out.println(arr[4]);

    int[] x = new int[4]; // array is created and only 4 elemnts can be inserted in it.. means 4 size ka
                          // array | 0 to 3 index of this array
    x[0] = 12;
    x[1] = 12;
    x[2] = 12;
    x[3] = 7782;
    // x[4] = 12;
    System.out.println(x[3]);

  }
}
