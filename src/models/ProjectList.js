/* eslint-disable import/no-cycle */
import { setStorage } from '../data';
import Project from './Project';

class ProjectList {
  constructor(projects) {
    this.projects = projects || [];
    if (this.projects.length < 1) {
      this.projects.push(new Project({ name: 'Default' }));
    }
    this.projectCount = 0;
  }

  add({ name }) {
    const newProject = new Project({ name });
    this.projects.push(newProject);
    this.projectCount += 1;
    setStorage();
  }

  deleteProject(index) {
    this.splice(index, 1);
    this.projectCount -= 1;
    setStorage();
  }
}

export default ProjectList;
