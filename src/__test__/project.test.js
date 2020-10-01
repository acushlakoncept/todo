const { createProject, deleteProject } = require('../utils/common');

describe('Project', () => {
  const projectName = 'Test Project';
  let name; let tasks; let project;
  beforeEach(() => {
    project = createProject(projectName);
    ({ name, tasks } = project);
  });

  describe('Create', () => {
    it('Should create a Project', () => {
      expect(name).toEqual(projectName);
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks.length).toBe(0);
    });
  });

  describe('Delete', () => {
    it('Should create a Project', () => {
      let projects = [project];
      projects = deleteProject(projects, project.id);
      expect(projects).not.toContain(project);
      expect(projects.length).toEqual(0);
    });
  });
});