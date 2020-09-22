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
}

export default Project;

// const first = new Project('Test Project');
// first.addTask('wash', Date.now(), 'Testing', 'high');
// first.addTask('buy', Date.now(), 'Delete', 'high');
// // console.log(first);

// first.deleteTask(1);

// console.log(first);