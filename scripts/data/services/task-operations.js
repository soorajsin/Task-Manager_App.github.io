 import Task from "../models/task.js";
 export const TASK_OPERATIONS = { //constant
           tasks: [],
           getTasks() {
                     return this.tasks;
           },
           getSize() {
                     return this.tasks.length;
           },
           getMarkCOunt() {
                     return this.tasks.filter(taskObject => taskObject.isMarked).length;
           },
           getUnMarkCount() {
                     return this.getSize() - this.getMarkCOunt();
           },
           add(taskObject) {
                     //taskObject (generic object) convert specific onject
                     let task = new Task();
                     for (let key in taskObject) {
                               task[key] = taskObject[key];
                     }
                     this.tasks.push(task);
                     console.log('All task are', this.tasks);
           },
           remove() {
                     this.tasks = this.tasks.filter(taskObject => !taskObject.isMarked);
                     return this.tasks;
           },
           search(taskId) {
                     return this.tasks.find(taskObject => taskObject.id === taskId);
           },
           update() {

           },
           sort() {

           },
           toggleMark(taskId) {
                     const taskObject = this.search(taskId);
                     if (taskObject) {
                               taskObject.toggle();
                     }
           }
 }

 //export default TASK_OPERATIONS;