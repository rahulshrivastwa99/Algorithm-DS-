public class Arrays_2D {
  public static void main(String[] args) {
    int[][] arr = new int[3][4];
    System.out.println("No of rows " + arr.length);
    System.out.println("No of colums " + arr[0].length);
    for (int i = 0; i < arr.length; i++) {
      for (int j = 0; j < arr[i].length; j++) {
        arr[i][j] = (i + 1) * (j + 1);
        System.out.print(arr[i][j] + " ");
      }
      System.out.println();
    }
  }
}
