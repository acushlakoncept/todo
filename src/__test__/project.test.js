const { createProject } = require('../utils/common');

describe('Project', () => {
  describe('Creation', () => {
    it('Should create a Project', () => {
      const projectName = 'Test Project';
      const { name, tasks } = createProject(projectName);
      expect(name).toEqual(projectName);
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks.length).toBe(0);
    });
  });
});