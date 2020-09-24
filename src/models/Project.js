/* eslint-disable import/no-cycle */
import { setStorage } from '../data';
import getWeekNumber from '../utils/common';
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
    return this.tasks.filter(({ date }) => {
      const currentDate = new Date().toISOString().slice(0, 10);
      return currentDate === date;
    });
  }

  weekTasks() {
    return this.tasks.filter(({ date }) => getWeekNumber(date) === getWeekNumber(new Date()));
  }

  allTasks() {
    return this.tasks;
  }
}

export default Project;
