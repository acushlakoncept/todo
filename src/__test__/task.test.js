const {
  createTask, editTask, createProject, clearCompletedTasks,
} = require('../utils/common');

describe('Task', () => {
  let name; let description; let priority; let
    note; let task; let project; let taskId;
  beforeEach(() => {
    task = createTask('Test', Date.now(), 'Testing Jest', 'High', 'Testing Jest');
    project = createProject('Test');
    ({
      name, description, priority, note,
    } = task);
    taskId = task.id;
    project.tasks.push(task);
  });

  describe('Creation', () => {
    it('Should Create A Task', () => {
      expect(name).toEqual('Test');
      expect(description).toEqual('Testing Jest');
      expect(priority).toEqual('High');
      expect(note).toEqual('Testing Jest');
    });
  });

  describe('Edit', () => {
    it('Should edit a Task', () => {
      const editedTaskDetails = {
        taskName: 'Edited Task',
        taskPriority: 'Medium',
      };

      const {
        name, priority,
      } = editTask(project, taskId, editedTaskDetails);

      expect(name).toEqual('Edited Task');
      expect(priority).toEqual('Medium');
    });
  });

  describe('Completed Tasks', () => {
    it('Clear', () => {
      const editedTaskDetails = {
        taskComplete: true,
      };

      editTask(project, taskId, editedTaskDetails);
      let { tasks } = project;
      tasks = clearCompletedTasks(project);

      expect(tasks).not.toContain(task);
    });
  });

  describe('Task Count', () => {
    it('Counts', () => {
      const editedTaskDetails = {
        taskComplete: true,
      };

      editTask(project, taskId, editedTaskDetails);
      let { tasks } = project;
      tasks = clearCompletedTasks(project);

      expect(tasks).not.toContain(task);
    });
  });
});