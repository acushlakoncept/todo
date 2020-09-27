export default () => {
  const createTaskBtn = document.createElement('button');
  createTaskBtn.classList.add(
    'btn',
    'btn-primary',
    'mt-4',
    'mb-4',
    'text-center',
  );
  createTaskBtn.id = 'createNewTaskBtn';
  createTaskBtn.dataset.name = 'task';
  createTaskBtn.dataset.toggle = 'modal';
  createTaskBtn.dataset.target = '#taskModal';
  createTaskBtn.innerText = 'Create Task';

  return createTaskBtn;
};