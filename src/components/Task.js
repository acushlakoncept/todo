class Task {
  constructor(name, date, description, priority, note) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.note = note;
    this.completed = false;
  }

  edit(name, date, description, priority, note, completed) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.note = note;
    this.completed = completed;
  }
}

export default Task;
