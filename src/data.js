/* eslint-disable import/no-cycle */
import ProjectList from './models/ProjectList';
import Project from './models/Project';
import Task from './models/Task';

let storage = {};

export const getProjects = () => {
  const parsedData = JSON.parse(localStorage.getItem('projects'));
  if (parsedData) {
    storage = new ProjectList(parsedData.projects);
    storage.projects = storage.projects.map((prj) => {
      const { name, count, tasks } = prj;
      prj = new Project({ name, count, tasks });
      prj.tasks.map((task) => {
        const {
          name, date, description, priority, note, completed,
        } = task;
        task = new Task({
          name, date, description, priority, note, completed,
        });
        return task;
      });
      return prj;
    });
  } else {
    storage = new ProjectList();
  }
  return storage;
};

export const setStorage = () => {
  localStorage.setItem('projects', JSON.stringify(storage));
};
