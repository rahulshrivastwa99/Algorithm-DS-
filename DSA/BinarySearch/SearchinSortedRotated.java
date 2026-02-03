package DSA.BinarySearch;

public class SearchinSortedRotated {

  public int search(int[] nums, int target) {
    if (nums == null || nums.length == 0)
      return -1;
    int n = nums.length;

    // 1) find pivot = index of smallest element
    int pivot = findPivot(nums);

    // 2) decide in which part target lies
    if (nums[pivot] <= target && target <= nums[n - 1]) {
      return binarySearch(nums, pivot, n - 1, target);
    } else {
      return binarySearch(nums, 0, pivot - 1, target);
    }
  }

  // find index of smallest element (pivot) in rotated sorted array
  private int findPivot(int[] nums) {
    int lo = 0, hi = nums.length - 1;
    while (lo < hi) {
      int mid = lo + (hi - lo) / 2;

      // If mid element is > last element, minimum is to the right
      if (nums[mid] > nums[hi]) {
        lo = mid + 1;
      } else {
        // nums[mid] <= nums[hi], minimum is at mid or left side
        hi = mid;
      }
    }
    return lo; // lo == hi == pivot
  }

  // standard binary search on nums[lo..hi], inclusive. returns index or -1
  private int binarySearch(int[] nums, int lo, int hi, int target) {
    while (lo <= hi) {
      int mid = lo + (hi - lo) / 2;

      if (nums[mid] == target)
        return mid;
      else if (nums[mid] < target)
        lo = mid + 1;
      else
        hi = mid - 1;
    }
    return -1;
  }

  // -------------------------------------
  // MAIN METHOD
  // -------------------------------------
  public static void main(String[] args) {

    SearchinSortedRotated obj = new SearchinSortedRotated();

    int[] nums = { 4, 5, 6, 7, 0, 1, 2 };

    // multiple targets
    int[] targets = { 1, 6, 0, 7, 2, 100 };

    for (int t : targets) {
      int result = obj.search(nums, t);
      System.out.println("Target " + t + " found at index: " + result);
    }
  }

}
