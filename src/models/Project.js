/* eslint-disable import/no-cycle */
import { setStorage } from '../data';
import Task from './Task';

class Project {
  constructor({ name, tasks, count }) {
    this.name = name;
    this.tasks = tasks || [];
    this.taskCount = count || 0;
  }

  edit(newName) {
    this.name = newName;
    setStorage();
  }

  addTask({
    name, date, description, priority, note,
  }) {
    const newTask = new Task({
      name, date, description, priority, note,
    });
    this.tasks.push(newTask);
    this.taskCount += 1;
    setStorage();
  }

  editTask(index, {
    name, date, description, priority, note,
  }) {
    const taskToEdit = this.tasks[index];
    taskToEdit.edit({
      name, date, description, priority, note,
    });
    setStorage();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.taskCount -= 1;
    setStorage();
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
