public class Studentclass {
  public static void main(String[] args) {
    Student s1 = new Student();
    s1.rollno = 21;
    s1.name = "Rahul";

    s1.Studentinfo();
  }

}

class Student {
  int rollno;
  String name;

  public void Studentinfo() {
    System.out.println("Hello" + " " + this.name + " " + this.rollno);
  }
}
