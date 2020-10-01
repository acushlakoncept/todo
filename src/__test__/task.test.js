const { createTask } = require('../utils/common');

describe('Task', () => {
  describe('Creation', () => {
    it('Should create a Task', () => {
      const {
        name, description, priority, note,
      } = createTask('Test', Date.now(), 'Testing Jest', 'High', 'Testing Jest');
      expect(name).toEqual('Test');
      expect(description).toEqual('Testing Jest');
      expect(priority).toEqual('High');
      expect(note).toEqual('Testing Jest');
    });
  });
});