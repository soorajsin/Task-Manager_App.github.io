//this is task model
class Task {
          constructor(id, name, desc, date, color, url) {
                    this.id = id;
                    this.name = name;
                    this.desc = desc;
                    this.date = date;
                    this.color = color;
                    this.url = url;
                    this.isMarked = false; // Not red record /Not ready for delete
          }
          toggle() {
                    this.isMarked = !this.isMarked;
          }
}
export default Task; //default means :- one file me one time