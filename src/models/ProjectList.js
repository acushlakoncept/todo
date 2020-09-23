import Project from './Project';

class ProjectList {
  constructor() {
    this.projects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : [];
    if (this.projects.length < 1) {
      this.projects.push(new Project('Default'));
      this.projectCount = 0;
    }
  }

  add(name) {
    this.projects.push(new Project(name));
    this.projectCount += 1;
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  deleteProject(index) {
    this.splice(index, 1);
    this.projectCount -= 1;
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }
}

export default ProjectList;
