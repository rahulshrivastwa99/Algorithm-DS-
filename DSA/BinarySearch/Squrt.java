package DSA.BinarySearch;

public class Squrt {

  public static int mySqrt(int n) {
    if (n == 0 || n == 1) {
      return n;
    }
    int i = 1, j = n;

    while (i <= j) {
      int mid = i + (j - i) / 2;
      if (mid == n / mid)
        return mid;
      else if (mid < n / mid) {

        i = mid + 1;
      } else {
        j = mid - 1;
      }
    }
    return j;
  }

  public static void main(String[] args) {
    int n = 8;
    int root = mySqrt(n);
    System.out.println("The square root of " + n + " is: " + root);

  }
}
