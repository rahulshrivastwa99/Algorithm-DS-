public class Duplicate {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
    int arr[] = { 1, 2, 3, 4, 5, 1 };
    System.out.println("Duplicate elements in the array:");
    // APPROACH 1 USING BRUTE FORCE
    // for (int i = 0; i < arr.length; i++) {
    // for (int j = i + 1; j < arr.length; j++) {
    // if (arr[i] == arr[j]) {
    // System.out.println(arr[j]);
    // }
    // }
    // }
    // APPROACH 2 USING HASHING
    // boolean visited[] = new boolean[arr.length + 1];
    // for (int i = 0; i < arr.length; i++) {
    // if (visited[arr[i]] == true) {
    // System.out.println(arr[i]);
    // } else {
    // visited[arr[i]] = true;
    // }
    // }
    // APPROACH 3 USING CYCLE DETECTION (FLOYD'S ALGORITHM)
    // for (int i = 0; i < arr.length; i++) {
    // int index = Math.abs(arr[i]);
    // if (arr[index] >= 0) {
    // arr[index] = -arr[index];
    // } else {
    // System.out.println(index);
    // }
    // }
    // APPROACH 4 USING SORTING
    int sum = 0;
    int n = 0; // this should store the MAX value, not length!!

    // 1) Sum of array
    for (int i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    System.out.println("Sum is: " + sum);

    // 2) Find max element (this is your n)
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] > n) {
        n = arr[i];
      }
    }
    System.out.println("n (max natural number) is: " + n);

    // 3) Natural sum formula
    int naturalSum = n * (n + 1) / 2;
    System.out.println("Natural Sum is: " + naturalSum);

    // 4) Duplicate = sum(arr) - sum(1..n)
    int duplicate = sum - naturalSum;
    System.out.println("Duplicate is: " + duplicate);
  }
}
