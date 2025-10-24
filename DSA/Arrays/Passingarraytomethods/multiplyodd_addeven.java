package DSA.Arrays.Passingarraytomethods;

public class multiplyodd_addeven {
  public static void main(String[] args) {
    int[] arr = { 10, 20, 30, 40, 50, 60 };
    System.out.print("Before the array:" + " ");
    for (int i = 0; i < arr.length; i++) {
      System.out.print(arr[i] + " ");
    }
    System.out.println();
    for (int i = 0; i < arr.length; i++) {
      if (i % 2 != 0) {
        arr[i] *= 2;
      } else {
        arr[i] += 10;
      }
    }
    System.out.print("After the array:" + " ");
    for (int i = 0; i < arr.length; i++) {
      System.out.print(arr[i] + " ");
    }
  }

}
