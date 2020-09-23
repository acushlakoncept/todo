import Project from './Project';

class ProjectList {
  constructor() {
    this.projects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : [];
    this.projects.push(new Project('Default'))
    console.log('Constructor', this.projects)
    this.projectCount = 0;
  }

  add(name) {
    this.projects.push(new Project(name));
    this.projectCount += 1;
    console.log('Add', this.projects, this.projectCount)
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  deleteProject(index) {
    this.splice(index, 1);
    this.projectCount -= 1;
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }
}

export default ProjectList;

// const qq = new ProjectList();
// qq.add('Hello');
// console.log(qq);