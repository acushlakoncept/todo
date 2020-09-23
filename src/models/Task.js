// eslint-disable-next-line import/no-cycle
import { setStorage } from '../data';

class Task {
  constructor({
    name, date, description, priority, note,
  }) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.note = note;
    this.completed = false;
    setStorage();
  }

  edit({
    name, date, description, priority, note, completed,
  }) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.note = note;
    this.completed = completed;
    setStorage();
  }
}

export default Task;
