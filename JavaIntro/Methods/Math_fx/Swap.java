package JavaIntro.Methods.Math_fx;

import java.util.Scanner;

public class Swap {

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int[] nums = { sc.nextInt(), sc.nextInt() };

    System.out.println("Before: " + nums[0] + "  " + nums[1]);
    swap(nums);
    System.out.println("After: " + nums[0] + "  " + nums[1]);
  }

  public static void swap(int[] arr) {
    int temp = arr[0];
    arr[0] = arr[1];
    arr[1] = temp;
  }

}
