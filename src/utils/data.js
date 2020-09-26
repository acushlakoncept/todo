export default () => JSON.parse(localStorage.getItem('todo-projects')) || [];
export const LOCAL_STORAGE_PROJECT_ID_KEY = 'todo.selectedProjectId';
