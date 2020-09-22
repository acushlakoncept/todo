import Task from './Task';

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.taskCount = 0;
  }

  edit(newName) {
    this.name = newName;
  }

  addTask(...params) {
    const newTask = new Task(...params);
    this.tasks.push(newTask);
    this.taskCount += 1;
  }

  editTask(index, ...params) {
    const taskToEdit = this.tasks[index];
    taskToEdit.edit(...params);
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.taskCount -= 1;
  }

  todayTasks() {
    return this.tasks.filter((task) => {
      const currentDate = new Date().toISOString().slice(0, 10);
      return currentDate === task.date;
    });
  }

  weekTasks() {
    return this.tasks.filter((task) => {
      const taskDate = task.date;
      const currentDate = new Date();
      return (Date.parse(taskDate) - Date.parse(currentDate)) < 604800000;
    });
  }

  allTasks() {
    return this.tasks;
  }
}

export default Project;

// const first = new Project('Test Project');
// first.addTask('wash', Date.now(), 'Testing', 'high');
// first.addTask('buy', Date.now(), 'Delete', 'high');
// // console.log(first);

// first.deleteTask(1);

// console.log(first);