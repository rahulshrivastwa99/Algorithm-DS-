public class objects {

  public static void main(String[] args) {
    Pen pen1 = new Pen();
    pen1.color = "Red";
    pen1.type = "gel";

    Pen pen2 = new Pen();
    pen2.color = "blue";
    pen2.type = "ball";

    pen1.write();
    pen1.printinfo();
    pen1.printinfo();
    pen1.printinfo();
    pen2.printinfo();
  }
}

class Pen {
  String color;
  String type;

  public void write() {

    System.out.println("WRITE HERE!!");

  }

  public void printinfo() {
    System.out.println(this.color);
    System.out.println(this.type);

  }
}
