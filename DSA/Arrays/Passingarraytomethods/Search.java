package DSA.Arrays.Passingarraytomethods;

public class Search {

  public static void main(String[] args) {
    int[] arr = { 1, 2, 3, 4, 45, 5, 6 };
    int target = 456;
    boolean found = false;
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] == target) {
        System.out.println("array m present hai  iss index pr " + " " + i);
        found = true;
        break;
      }
    }
    if (!found) {
      System.out.println("Nhi hai array m");
    }
  }
}
