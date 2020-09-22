import Project from './Project';

class ProjectList {
  constructor() {
    this.projects = [];
    this.projects.push(new Project('Default'));
    this.projectCount = 0;
  }

  add(name) {
    this.projects.push(new Project(name));
    this.projectCount += 1;
  }

  deleteProject(index) {
    this.splice(index, 1);
    this.projectCount -= 1;
  }
}

export default ProjectList;

// const qq = new ProjectList();
// qq.add('Hello');
// console.log(qq);