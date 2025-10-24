public class missing {
  public static void main(String[] args) {
    int[] arr = { 1, 2, 3, 4, 5, 6, 7, 8, 10 };
    long n = arr.length + 1;
    long sum = n * (n + 1) / 2;
    long arraySum = 0;

    for (int value : arr) {
      arraySum += value;
    }

    long missingNumber = sum - arraySum;
    System.out.println("Missing number: " + missingNumber);
  }
}

/*
 * [1,2,3,5] array length hogayi 4
 * 
 * int n = arr.length + 1; uska mtlv hogya 5
 * 
 * sum = n*(n+1)/2 == 5*6/2 = 15 === 5+4+3+2+1
 * 
 * 
 */
